function createTextWriter(newLine) {
            var output;
            var indent2;
            var lineStart;
            var lineCount;
            var linePos;
            var hasTrailingComment = false;
            function updateLineCountAndPosFor(s) {
                const lineStartsOfS = computeLineStarts(s);
                if (lineStartsOfS.length > 1) {
                    lineCount = lineCount + lineStartsOfS.length - 1;
                    linePos = output.length - s.length + last(lineStartsOfS);
                    lineStart = linePos - output.length === 0;
                }
                else {
                    lineStart = false;
                }
            }
            function writeText(s) {
                if (s && s.length) {
                    if (lineStart) {
                        s = getIndentString(indent2) + s;
                        lineStart = false;
                    }
                    output += s;
                    updateLineCountAndPosFor(s);
                }
            }
            function write(s) {
                if (s)
                    hasTrailingComment = false;
                writeText(s);
            }
            function writeComment(s) {
                if (s)
                    hasTrailingComment = true;
                writeText(s);
            }
            function reset2() {
                output = "";
                indent2 = 0;
                lineStart = true;
                lineCount = 0;
                linePos = 0;
                hasTrailingComment = false;
            }
            function rawWrite(s) {
                if (s !== void 0) {
                    output += s;
                    updateLineCountAndPosFor(s);
                    hasTrailingComment = false;
                }
            }
            function writeLiteral(s) {
                if (s && s.length) {
                    write(s);
                }
            }
            function writeLine(force) {
                if (!lineStart || force) {
                    output += newLine;
                    lineCount++;
                    linePos = output.length;
                    lineStart = true;
                    hasTrailingComment = false;
                }
            }
            function getTextPosWithWriteLine() {
                return lineStart ? output.length : output.length + newLine.length;
            }
            reset2();
            return {
                write,
                rawWrite,
                writeLiteral,
                writeLine,
                increaseIndent: () => {
                    indent2++;
                },
                decreaseIndent: () => {
                    indent2--;
                },
                getIndent: () => indent2,
                getTextPos: () => output.length,
                getLine: () => lineCount,
                getColumn: () => lineStart ? indent2 * getIndentSize() : output.length - linePos,
                getText: () => output,
                isAtStartOfLine: () => lineStart,
                hasTrailingComment: () => hasTrailingComment,
                hasTrailingWhitespace: () => !!output.length && isWhiteSpaceLike(output.charCodeAt(output.length - 1)),
                clear: reset2,
                writeKeyword: write,
                writeOperator: write,
                writeParameter: write,
                writeProperty: write,
                writePunctuation: write,
                writeSpace: write,
                writeStringLiteral: write,
                writeSymbol: (s, _) => write(s),
                writeTrailingSemicolon: write,
                writeComment,
                getTextPosWithWriteLine
            };
        }