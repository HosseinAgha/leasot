"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_stdin_1 = __importDefault(require("get-stdin"));
const globby_1 = __importDefault(require("globby"));
const log_symbols_1 = __importDefault(require("log-symbols"));
const __1 = require("..");
const path_1 = require("path");
const async_1 = require("async");
const fs_1 = require("fs");
const DEFAULT_EXTENSION = '.js';
const CONCURRENCY_LIMIT = 50;
/**
 * @hidden
 */
exports.getFiletype = (filetype, filename) => {
    if (filetype) {
        return filetype;
    }
    if (filename && path_1.extname(filename)) {
        return path_1.extname(filename);
    }
    return DEFAULT_EXTENSION;
};
const parseContentSync = (content, program, filename) => {
    const extension = exports.getFiletype(program.filetype, filename);
    __1.associateExtWithParser(program.associateParser);
    if (!__1.isExtensionSupported(extension)) {
        if (program.skipUnsupported) {
            return [];
        }
        console.log(log_symbols_1.default.error, `Filetype ${extension} is unsupported.`);
        process.exit(1);
    }
    const config = {
        customTags: program.tags,
        extension: extension,
        filename: filename,
        withInlineFiles: program.inlineFiles,
    };
    return __1.parse(content, config);
};
const outputTodos = (todos, { reporter, exitNicely }) => {
    try {
        const output = __1.report(todos, reporter);
        console.log(output);
    }
    catch (e) {
        console.error(e);
    }
    if (exitNicely) {
        process.exit(0);
    }
    process.exit(todos.length ? 1 : 0);
};
const parseAndReportFiles = (fileGlobs, program) => {
    // Get all files and their resolved globs
    const files = globby_1.default.sync(fileGlobs, {
        ignore: program.ignore || [],
    });
    if (!files || !files.length) {
        console.log(log_symbols_1.default.warning, 'No files found for parsing');
        process.exit(1);
    }
    // Parallel read all of the given files
    async_1.mapLimit(files, CONCURRENCY_LIMIT, (file, cb) => fs_1.readFile(path_1.resolve(process.cwd(), file), 'utf8', cb), (err, results) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        const todos = results
            .map(function (content, index) {
            return parseContentSync(content, program, files[index]);
        })
            // filter files without any parsed content
            .filter(item => item && item.length > 0)
            .reduce((items, item) => items.concat(item), []);
        outputTodos(todos, program);
    });
};
const run = (program) => {
    if (program.args && program.args.length > 0) {
        return parseAndReportFiles(program.args, program);
    }
    if (process.stdin.isTTY) {
        return program.help();
    }
    // data is coming from a pipe
    get_stdin_1.default()
        .then(function (content) {
        const todos = parseContentSync(content, program);
        outputTodos(todos, program);
    })
        .catch(function (e) {
        console.error(e);
        process.exit(1);
    });
};
exports.default = run;
