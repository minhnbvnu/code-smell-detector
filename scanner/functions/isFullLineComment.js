function isFullLineComment(line, lineNumber, comment) {
                const start = comment.loc.start, end = comment.loc.end, isFirstTokenOnLine = start.line === lineNumber && !line.slice(0, start.column).trim(), isLastTokenOnLine = end.line === lineNumber && !line.slice(end.column).trim();
                return comment &&
                    (start.line < lineNumber || isFirstTokenOnLine) &&
                    (end.line > lineNumber || isLastTokenOnLine);
            }