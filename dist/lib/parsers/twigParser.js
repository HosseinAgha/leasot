"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const eol_1 = require("eol");
const parserFactory = ({ customTags }) => {
    const regex = utils_1.getRegex(customTags);
    const bangComment = new RegExp('{#' + regex + '#}', 'mig');
    const htmlComment = new RegExp('<!--' + regex + '-->', 'mig');
    return function parse(contents, file) {
        const comments = [];
        eol_1.split(contents).forEach(function (line, index) {
            let bangCommentMatch = bangComment.exec(line);
            while (bangCommentMatch) {
                const comment = utils_1.prepareComment(bangCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                bangCommentMatch = bangComment.exec(line);
            }
            let htmlCommentMatch = htmlComment.exec(line);
            while (htmlCommentMatch) {
                const comment = utils_1.prepareComment(htmlCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                htmlCommentMatch = htmlComment.exec(line);
            }
        });
        return comments;
    };
};
exports.default = parserFactory;
