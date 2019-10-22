"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const eol_1 = require("eol");
const parserFactory = ({ customTags }) => {
    const regex = utils_1.getRegex(customTags);
    const ssCommentRegex = new RegExp('<%--' + regex + '--%>', 'mig');
    const htmlCommentRegex = new RegExp('<!--' + regex + '-->', 'mig');
    return function parse(contents, file) {
        const comments = [];
        eol_1.split(contents).forEach(function (line, index) {
            let ssCommentsMatch = ssCommentRegex.exec(line);
            while (ssCommentsMatch) {
                const comment = utils_1.prepareComment(ssCommentsMatch, index + 1, file);
                if (!comment) {
                    return;
                }
                comments.push(comment);
                ssCommentsMatch = ssCommentRegex.exec(line);
            }
            let htmlCommentMatch = htmlCommentRegex.exec(line);
            while (htmlCommentMatch) {
                const comment = utils_1.prepareComment(htmlCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                htmlCommentMatch = htmlCommentRegex.exec(line);
            }
        });
        return comments;
    };
};
exports.default = parserFactory;
