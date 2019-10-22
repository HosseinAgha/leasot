"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const eol_1 = require("eol");
const parserFactory = ({ customTags }) => {
    const regex = utils_1.getRegex(customTags);
    const commentsRegex = new RegExp('{{!(?:--)?' + regex + '(?:--)?}}', 'mig');
    return function parse(contents, file) {
        const comments = [];
        eol_1.split(contents).forEach(function (line, index) {
            let match = commentsRegex.exec(line);
            while (match) {
                const comment = utils_1.prepareComment(match, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                match = commentsRegex.exec(line);
            }
        });
        return comments;
    };
};
exports.default = parserFactory;
