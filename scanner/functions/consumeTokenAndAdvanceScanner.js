function consumeTokenAndAdvanceScanner(currentTokenInfo, parent2, dynamicIndentation, container, isListEndToken) {
                    Debug.assert(rangeContainsRange(parent2, currentTokenInfo.token));
                    const lastTriviaWasNewLine = formattingScanner.lastTrailingTriviaWasNewLine();
                    let indentToken = false;
                    if (currentTokenInfo.leadingTrivia) {
                        processTrivia(currentTokenInfo.leadingTrivia, parent2, childContextNode, dynamicIndentation);
                    }
                    let lineAction = 0 /* None */;
                    const isTokenInRange = rangeContainsRange(originalRange, currentTokenInfo.token);
                    const tokenStart = sourceFile.getLineAndCharacterOfPosition(currentTokenInfo.token.pos);
                    if (isTokenInRange) {
                        const rangeHasError = rangeContainsError(currentTokenInfo.token);
                        const savePreviousRange = previousRange;
                        lineAction = processRange(currentTokenInfo.token, tokenStart, parent2, childContextNode, dynamicIndentation);
                        if (!rangeHasError) {
                            if (lineAction === 0 /* None */) {
                                const prevEndLine = savePreviousRange && sourceFile.getLineAndCharacterOfPosition(savePreviousRange.end).line;
                                indentToken = lastTriviaWasNewLine && tokenStart.line !== prevEndLine;
                            }
                            else {
                                indentToken = lineAction === 1 /* LineAdded */;
                            }
                        }
                    }
                    if (currentTokenInfo.trailingTrivia) {
                        previousRangeTriviaEnd = last(currentTokenInfo.trailingTrivia).end;
                        processTrivia(currentTokenInfo.trailingTrivia, parent2, childContextNode, dynamicIndentation);
                    }
                    if (indentToken) {
                        const tokenIndentation = isTokenInRange && !rangeContainsError(currentTokenInfo.token) ? dynamicIndentation.getIndentationForToken(tokenStart.line, currentTokenInfo.token.kind, container, !!isListEndToken) : -1 /* Unknown */;
                        let indentNextTokenOrTrivia = true;
                        if (currentTokenInfo.leadingTrivia) {
                            const commentIndentation = dynamicIndentation.getIndentationForComment(currentTokenInfo.token.kind, tokenIndentation, container);
                            indentNextTokenOrTrivia = indentTriviaItems(currentTokenInfo.leadingTrivia, commentIndentation, indentNextTokenOrTrivia, (item) => insertIndentation(item.pos, commentIndentation, 
                            /*lineAdded*/
                            false));
                        }
                        if (tokenIndentation !== -1 /* Unknown */ && indentNextTokenOrTrivia) {
                            insertIndentation(currentTokenInfo.token.pos, tokenIndentation, lineAction === 1 /* LineAdded */);
                            lastIndentedLine = tokenStart.line;
                            indentationOnLastIndentedLine = tokenIndentation;
                        }
                    }
                    formattingScanner.advance();
                    childContextNode = parent2;
                }