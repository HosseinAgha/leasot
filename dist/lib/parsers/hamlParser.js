"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const eol_1 = require("eol");
const parserFactory = ({ customTags }) => {
    const regex = utils_1.getRegex(customTags);
    const hamlRubyComment = new RegExp('^\\s*-#' + regex + '$', 'mig');
    const hamlHtmlComment = new RegExp('^\\s*/' + regex + '$', 'mig');
    const erbComment = new RegExp('<%#' + regex + '%>', 'mig');
    const htmlComment = new RegExp('<!--' + regex + '-->', 'mig');
    return function parse(contents, file) {
        const comments = [];
        eol_1.split(contents).forEach(function (line, index) {
            let hamlRubyCommentMatch = hamlRubyComment.exec(line);
            let hamlHtmlCommentMatch = hamlHtmlComment.exec(line);
            let erbCommentMatch = erbComment.exec(line);
            let htmlCommentMatch = htmlComment.exec(line);
            while (hamlRubyCommentMatch) {
                const comment = utils_1.prepareComment(hamlRubyCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                hamlRubyCommentMatch = hamlRubyComment.exec(line);
            }
            while (hamlHtmlCommentMatch) {
                const comment = utils_1.prepareComment(hamlHtmlCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                hamlHtmlCommentMatch = hamlHtmlComment.exec(line);
            }
            while (erbCommentMatch) {
                const comment = utils_1.prepareComment(erbCommentMatch, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                erbCommentMatch = erbComment.exec(line);
            }
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
