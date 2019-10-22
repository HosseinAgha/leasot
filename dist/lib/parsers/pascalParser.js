"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const eol_1 = require("eol");
const parserFactory = ({ customTags }) => {
    const regex = utils_1.getRegex(customTags);
    const commentsRegex = new RegExp('^\\s*//' + regex + '$', 'mig');
    const multiLineRegex = new RegExp('^\\s*{' + regex + '}$', 'mig');
    return function parse(contents, file) {
        let comments = [];
        eol_1.split(contents).forEach(function (line, index) {
            let hashMatch = commentsRegex.exec(line);
            while (hashMatch) {
                const comment = utils_1.prepareComment(hashMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                hashMatch = commentsRegex.exec(line);
            }
            let multiLineMatch = multiLineRegex.exec(line);
            while (multiLineMatch) {
                const comment = utils_1.prepareComment(multiLineMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                multiLineMatch = multiLineRegex.exec(line);
            }
        });
        // sort by line number
        comments = comments.sort((a, b) => a.line - b.line);
        return comments;
    };
};
exports.default = parserFactory;
