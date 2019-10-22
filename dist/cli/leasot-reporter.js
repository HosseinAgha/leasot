"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const cli_reporter_1 = __importDefault(require("./cli-reporter"));
function list(val) {
    return val.split(',');
}
/* eslint-disable no-console */
commander_1.default
    .description('Report todos and fixmes from json files or stream')
    .version(require('../../package.json').version)
    .usage('[options] <file ...>')
    .option('-i, --ignore <patterns>', 'add ignore patterns', list, [])
    .option('-r, --reporter [reporter]', 'use reporter (table|json|xml|markdown|vscode|raw) (default: table)', 'table')
    .option('-x, --exit-nicely', 'exit with exit code 0 even if todos/fixmes are found', false)
    .on('--help', function () {
    console.log('');
    console.log('Examples:');
    console.log('    # Report todos from a specific file');
    console.log('    $ leasot-reporter index.json');
    console.log('');
    console.log('    # Report todos from a glob pattern');
    console.log(`    $ leasot-reporter '**/*.json'`);
    console.log('');
    console.log('    # Use the json reporter');
    console.log('    $ leasot-reporter --reporter json index.json');
    console.log('');
    console.log('    # Report from a json stream');
    console.log('    $ cat index.json | leasot-reporter --reporter xml');
    console.log('');
    console.log('    # Report from leasot parsing and filter todos using `jq`');
    console.log(`    $ leasot 'tests/**/*.styl' --reporter json | jq 'map(select(.tag == "TODO"))' | leasot-reporter`);
    console.log('');
})
    .parse(process.argv);
cli_reporter_1.default(commander_1.default);
