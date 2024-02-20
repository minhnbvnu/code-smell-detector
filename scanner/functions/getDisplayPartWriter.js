function getDisplayPartWriter() {
            const absoluteMaximumLength = defaultMaximumTruncationLength * 10;
            let displayParts;
            let lineStart;
            let indent2;
            let length2;
            resetWriter();
            const unknownWrite = (text) => writeKind(text, 17 /* text */);
            return {
                displayParts: () => {
                    const finalText = displayParts.length && displayParts[displayParts.length - 1].text;
                    if (length2 > absoluteMaximumLength && finalText && finalText !== "...") {
                        if (!isWhiteSpaceLike(finalText.charCodeAt(finalText.length - 1))) {
                            displayParts.push(displayPart(" ", 16 /* space */));
                        }
                        displayParts.push(displayPart("...", 15 /* punctuation */));
                    }
                    return displayParts;
                },
                writeKeyword: (text) => writeKind(text, 5 /* keyword */),
                writeOperator: (text) => writeKind(text, 12 /* operator */),
                writePunctuation: (text) => writeKind(text, 15 /* punctuation */),
                writeTrailingSemicolon: (text) => writeKind(text, 15 /* punctuation */),
                writeSpace: (text) => writeKind(text, 16 /* space */),
                writeStringLiteral: (text) => writeKind(text, 8 /* stringLiteral */),
                writeParameter: (text) => writeKind(text, 13 /* parameterName */),
                writeProperty: (text) => writeKind(text, 14 /* propertyName */),
                writeLiteral: (text) => writeKind(text, 8 /* stringLiteral */),
                writeSymbol,
                writeLine,
                write: unknownWrite,
                writeComment: unknownWrite,
                getText: () => "",
                getTextPos: () => 0,
                getColumn: () => 0,
                getLine: () => 0,
                isAtStartOfLine: () => false,
                hasTrailingWhitespace: () => false,
                hasTrailingComment: () => false,
                rawWrite: notImplemented,
                getIndent: () => indent2,
                increaseIndent: () => {
                    indent2++;
                },
                decreaseIndent: () => {
                    indent2--;
                },
                clear: resetWriter
            };
            function writeIndent() {
                if (length2 > absoluteMaximumLength)
                    return;
                if (lineStart) {
                    const indentString = getIndentString(indent2);
                    if (indentString) {
                        length2 += indentString.length;
                        displayParts.push(displayPart(indentString, 16 /* space */));
                    }
                    lineStart = false;
                }
            }
            function writeKind(text, kind) {
                if (length2 > absoluteMaximumLength)
                    return;
                writeIndent();
                length2 += text.length;
                displayParts.push(displayPart(text, kind));
            }
            function writeSymbol(text, symbol) {
                if (length2 > absoluteMaximumLength)
                    return;
                writeIndent();
                length2 += text.length;
                displayParts.push(symbolPart(text, symbol));
            }
            function writeLine() {
                if (length2 > absoluteMaximumLength)
                    return;
                length2 += 1;
                displayParts.push(lineBreakPart());
                lineStart = true;
            }
            function resetWriter() {
                displayParts = [];
                lineStart = true;
                indent2 = 0;
                length2 = 0;
            }
        }