function getIndentationForNodeWorker(current, currentStart, ignoreActualIndentationRange, indentationDelta, sourceFile, isNextChild, options) {
                        var _a2;
                        let parent2 = current.parent;
                        while (parent2) {
                            let useActualIndentation = true;
                            if (ignoreActualIndentationRange) {
                                const start = current.getStart(sourceFile);
                                useActualIndentation = start < ignoreActualIndentationRange.pos || start > ignoreActualIndentationRange.end;
                            }
                            const containingListOrParentStart = getContainingListOrParentStart(parent2, current, sourceFile);
                            const parentAndChildShareLine = containingListOrParentStart.line === currentStart.line || childStartsOnTheSameLineWithElseInIfStatement(parent2, current, currentStart.line, sourceFile);
                            if (useActualIndentation) {
                                const firstListChild = (_a2 = getContainingList(current, sourceFile)) == null ? void 0 : _a2[0];
                                const listIndentsChild = !!firstListChild && getStartLineAndCharacterForNode(firstListChild, sourceFile).line > containingListOrParentStart.line;
                                let actualIndentation = getActualIndentationForListItem(current, sourceFile, options, listIndentsChild);
                                if (actualIndentation !== -1 /* Unknown */) {
                                    return actualIndentation + indentationDelta;
                                }
                                actualIndentation = getActualIndentationForNode(current, parent2, currentStart, parentAndChildShareLine, sourceFile, options);
                                if (actualIndentation !== -1 /* Unknown */) {
                                    return actualIndentation + indentationDelta;
                                }
                            }
                            if (shouldIndentChildNode(options, parent2, current, sourceFile, isNextChild) && !parentAndChildShareLine) {
                                indentationDelta += options.indentSize;
                            }
                            const useTrueStart = isArgumentAndStartLineOverlapsExpressionBeingCalled(parent2, current, currentStart.line, sourceFile);
                            current = parent2;
                            parent2 = current.parent;
                            currentStart = useTrueStart ? sourceFile.getLineAndCharacterOfPosition(current.getStart(sourceFile)) : containingListOrParentStart;
                        }
                        return indentationDelta + getBaseIndentation(options);
                    }