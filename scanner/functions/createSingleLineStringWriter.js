function createSingleLineStringWriter() {
            var str = "";
            const writeText = (text) => str += text;
            return {
                getText: () => str,
                write: writeText,
                rawWrite: writeText,
                writeKeyword: writeText,
                writeOperator: writeText,
                writePunctuation: writeText,
                writeSpace: writeText,
                writeStringLiteral: writeText,
                writeLiteral: writeText,
                writeParameter: writeText,
                writeProperty: writeText,
                writeSymbol: (s, _) => writeText(s),
                writeTrailingSemicolon: writeText,
                writeComment: writeText,
                getTextPos: () => str.length,
                getLine: () => 0,
                getColumn: () => 0,
                getIndent: () => 0,
                isAtStartOfLine: () => false,
                hasTrailingComment: () => false,
                hasTrailingWhitespace: () => !!str.length && isWhiteSpaceLike(str.charCodeAt(str.length - 1)),
                // Completely ignore indentation for string writers.  And map newlines to
                // a single space.
                writeLine: () => str += " ",
                increaseIndent: noop,
                decreaseIndent: noop,
                clear: () => str = ""
            };
        }