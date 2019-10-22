"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const eol_1 = require("eol");
// I know this is different style, but I wasn't able to get the escape
// characters right
const parserFactory = ({ customTags }) => {
    const regex = utils_1.getRegex(customTags);
    const commentsRegex = new RegExp('^\\s*%' + regex + '$', 'mig');
    return function parse(contents, file) {
        const comments = [];
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
        });
        // doing the multiline match outside of the loop because we need
        // multiple lines
        const multilineRegex = new RegExp('^[ |\\t]*\\\\begin{comment}\\s*@?(todo|fixme)(?!\\w)\\s*(?:\\(([^)]*)\\))?\\s*:?\\s*((.*?)(?:\\s+([^\\s]+)\\s*)?)\\\\end{comment}', 'gmi');
        let m;
        while ((m = multilineRegex.exec(contents)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === multilineRegex.lastIndex) {
                multilineRegex.lastIndex++;
            }
            // Since we no longer know the line number as index, we have to
            // count it out. This could be inefficient for large files, so I
            // hope it doesn't become a performance problem
            const preceeding_lines = contents.slice(0, m.index);
            const line_no = preceeding_lines.split(/\r\n|\r|\n/).length;
            // Now prepare the comment
            const comment = utils_1.prepareComment(m, line_no, file);
            comments.push(comment);
        }
        return comments;
    };
};
exports.default = parserFactory;
