function nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile) {
                        const nextToken = findNextToken(precedingToken, current, sourceFile);
                        if (!nextToken) {
                            return 0 /* Unknown */;
                        }
                        if (nextToken.kind === 18 /* OpenBraceToken */) {
                            return 1 /* OpenBrace */;
                        }
                        else if (nextToken.kind === 19 /* CloseBraceToken */) {
                            const nextTokenStartLine = getStartLineAndCharacterForNode(nextToken, sourceFile).line;
                            return lineAtPosition === nextTokenStartLine ? 2 /* CloseBrace */ : 0 /* Unknown */;
                        }
                        return 0 /* Unknown */;
                    }