function checkForIrregularWhitespace(node) {
                const sourceLines = sourceCode.lines;
                sourceLines.forEach((sourceLine, lineIndex) => {
                    const lineNumber = lineIndex + 1;
                    let match;
                    while ((match = IRREGULAR_WHITESPACE.exec(sourceLine)) !== null) {
                        errors.push({
                            node,
                            messageId: "noIrregularWhitespace",
                            loc: {
                                start: {
                                    line: lineNumber,
                                    column: match.index
                                },
                                end: {
                                    line: lineNumber,
                                    column: match.index + match[0].length
                                }
                            }
                        });
                    }
                });
            }