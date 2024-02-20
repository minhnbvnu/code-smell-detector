function processChildNodes(nodes, parent2, parentStartLine, parentDynamicIndentation) {
                    Debug.assert(isNodeArray(nodes));
                    Debug.assert(!nodeIsSynthesized(nodes));
                    const listStartToken = getOpenTokenForList(parent2, nodes);
                    let listDynamicIndentation = parentDynamicIndentation;
                    let startLine = parentStartLine;
                    if (!rangeOverlapsWithStartEnd(originalRange, nodes.pos, nodes.end)) {
                        if (nodes.end < originalRange.pos) {
                            formattingScanner.skipToEndOf(nodes);
                        }
                        return;
                    }
                    if (listStartToken !== 0 /* Unknown */) {
                        while (formattingScanner.isOnToken() && formattingScanner.getStartPos() < originalRange.end) {
                            const tokenInfo = formattingScanner.readTokenInfo(parent2);
                            if (tokenInfo.token.end > nodes.pos) {
                                break;
                            }
                            else if (tokenInfo.token.kind === listStartToken) {
                                startLine = sourceFile.getLineAndCharacterOfPosition(tokenInfo.token.pos).line;
                                consumeTokenAndAdvanceScanner(tokenInfo, parent2, parentDynamicIndentation, parent2);
                                let indentationOnListStartToken;
                                if (indentationOnLastIndentedLine !== -1 /* Unknown */) {
                                    indentationOnListStartToken = indentationOnLastIndentedLine;
                                }
                                else {
                                    const startLinePosition = getLineStartPositionForPosition(tokenInfo.token.pos, sourceFile);
                                    indentationOnListStartToken = SmartIndenter.findFirstNonWhitespaceColumn(startLinePosition, tokenInfo.token.pos, sourceFile, options);
                                }
                                listDynamicIndentation = getDynamicIndentation(parent2, parentStartLine, indentationOnListStartToken, options.indentSize);
                            }
                            else {
                                consumeTokenAndAdvanceScanner(tokenInfo, parent2, parentDynamicIndentation, parent2);
                            }
                        }
                    }
                    let inheritedIndentation = -1 /* Unknown */;
                    for (let i = 0; i < nodes.length; i++) {
                        const child = nodes[i];
                        inheritedIndentation = processChildNode(child, inheritedIndentation, node, listDynamicIndentation, startLine, startLine, 
                        /*isListItem*/
                        true, 
                        /*isFirstListItem*/
                        i === 0);
                    }
                    const listEndToken = getCloseTokenForOpenToken(listStartToken);
                    if (listEndToken !== 0 /* Unknown */ && formattingScanner.isOnToken() && formattingScanner.getStartPos() < originalRange.end) {
                        let tokenInfo = formattingScanner.readTokenInfo(parent2);
                        if (tokenInfo.token.kind === 27 /* CommaToken */) {
                            consumeTokenAndAdvanceScanner(tokenInfo, parent2, listDynamicIndentation, parent2);
                            tokenInfo = formattingScanner.isOnToken() ? formattingScanner.readTokenInfo(parent2) : void 0;
                        }
                        if (tokenInfo && tokenInfo.token.kind === listEndToken && rangeContainsRange(parent2, tokenInfo.token)) {
                            consumeTokenAndAdvanceScanner(tokenInfo, parent2, listDynamicIndentation, parent2, 
                            /*isListEndToken*/
                            true);
                        }
                    }
                }