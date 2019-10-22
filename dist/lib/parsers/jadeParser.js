"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const eol_1 = require("eol");
const parserFactory = ({ customTags }) => {
    const regex = utils_1.getRegex(customTags);
    const commentsRegex = new RegExp('^\\s*\\/\\/-?' + regex + '$', 'mig');
    return function parse(contents, file) {
        const comments = [];
        eol_1.split(contents).forEach(function (line, index) {
            const match = commentsRegex.exec(line);
            const comment = utils_1.prepareComment(match, index + 1, file);
            if (!comment) {
                return;
            }
            comments.push(comment);
        });
        return comments;
    };
};
exports.default = parserFactory;
