function getSpanOfEnclosingComment(fileName, position, onlyMultiLine) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                const range = ts_formatting_exports.getRangeOfEnclosingComment(sourceFile, position);
                return range && (!onlyMultiLine || range.kind === 3 /* MultiLineCommentTrivia */) ? createTextSpanFromRange(range) : void 0;
            }