function checkForIrregularLineTerminators(node) {
                const source = sourceCode.getText(), sourceLines = sourceCode.lines, linebreaks = source.match(LINE_BREAK);
                let lastLineIndex = -1, match;
                while ((match = IRREGULAR_LINE_TERMINATORS.exec(source)) !== null) {
                    const lineIndex = linebreaks.indexOf(match[0], lastLineIndex + 1) || 0;
                    errors.push({
                        node,
                        messageId: "noIrregularWhitespace",
                        loc: {
                            start: {
                                line: lineIndex + 1,
                                column: sourceLines[lineIndex].length
                            },
                            end: {
                                line: lineIndex + 2,
                                column: 0
                            }
                        }
                    });
                    lastLineIndex = lineIndex;
                }
            }