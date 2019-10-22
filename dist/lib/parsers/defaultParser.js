"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const eol_1 = require("eol");
const rBlockComment = /\/\*(?:[\s\S]*?)\*\//gim;
// Bases on get-line-from-pos to support Windows as well
// See https://github.com/pgilad/get-line-from-pos/blob/master/index.js
function getLineFromPos(str, pos) {
    if (pos === 0) {
        return 1;
    }
    //adjust for negative pos
    if (pos < 0) {
        pos = str.length + pos;
    }
    const lines = eol_1.split(str.substr(0, pos));
    return lines.length;
}
const parserFactory = ({ customTags }) => {
    const regex = utils_1.getRegex(customTags);
    const rLineComment = new RegExp('^\\s*\\/\\/' + regex + '$', 'mig');
    const rInnerBlock = new RegExp('^\\s*(?:\\/\\*)?\\**!?' + regex + '(?:\\**\\/)?$', 'mig');
    return function parse(contents, file) {
        const comments = [];
        eol_1.split(contents).forEach(function (line, index) {
            let match = rLineComment.exec(line);
            while (match) {
                const comment = utils_1.prepareComment(match, index + 1, file);
                if (!comment) {
                    break;
                }
                comments.push(comment);
                match = rLineComment.exec(line);
            }
        });
        //look for block comments
        let match = rBlockComment.exec(contents);
        while (match) {
            if (!match || !match.length) {
                break;
            }
            //use first match as basis to look into todos/fixmes
            const baseMatch = match[0];
            // jshint loopfunc:true
            eol_1.split(baseMatch).forEach(function (line, index) {
                let subMatch = rInnerBlock.exec(line);
                while (subMatch) {
                    const adjustedLine = getLineFromPos(contents, match.index) + index;
                    const comment = utils_1.prepareComment(subMatch, adjustedLine, file);
                    if (!comment) {
                        break;
                    }
                    comments.push(comment);
                    subMatch = rInnerBlock.exec(line);
                }
            });
            match = rBlockComment.exec(contents);
        }
        return comments;
    };
};
exports.default = parserFactory;
