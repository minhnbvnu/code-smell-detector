function getSmartIndent(sourceFile, position, precedingToken, lineAtPosition, assumeNewLineBeforeCloseBrace, options) {
                        let previous;
                        let current = precedingToken;
                        while (current) {
                            if (positionBelongsToNode(current, position, sourceFile) && shouldIndentChildNode(options, current, previous, sourceFile, 
                            /*isNextChild*/
                            true)) {
                                const currentStart = getStartLineAndCharacterForNode(current, sourceFile);
                                const nextTokenKind = nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile);
                                const indentationDelta = nextTokenKind !== 0 /* Unknown */ ? assumeNewLineBeforeCloseBrace && nextTokenKind === 2 /* CloseBrace */ ? options.indentSize : 0 : lineAtPosition !== currentStart.line ? options.indentSize : 0;
                                return getIndentationForNodeWorker(current, currentStart, 
                                /*ignoreActualIndentationRange*/
                                void 0, indentationDelta, sourceFile, 
                                /*isNextChild*/
                                true, options);
                            }
                            const actualIndentation = getActualIndentationForListItem(current, sourceFile, options, 
                            /*listIndentsChild*/
                            true);
                            if (actualIndentation !== -1 /* Unknown */) {
                                return actualIndentation;
                            }
                            previous = current;
                            current = current.parent;
                        }
                        return getBaseIndentation(options);
                    }