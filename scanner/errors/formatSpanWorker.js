function formatSpanWorker(originalRange, enclosingNode, initialIndentation, delta, formattingScanner, { options, getRules, host }, requestKind, rangeContainsError, sourceFile) {
            function computeIndentation(node, startLine, inheritedIndentation, parent2, parentDynamicIndentation, effectiveParentStartLine) {
            function processNode(node, contextNode, nodeStartLine, undecoratedNodeStartLine, indentation, delta2) {
                function processChildNode(child, inheritedIndentation, parent2, parentDynamicIndentation, parentStartLine, undecoratedParentStartLine, isListItem, isFirstListItem) {
                    Debug.assert(!nodeIsSynthesized(child));
                    if (nodeIsMissing(child) || isGrammarError(parent2, child)) {
                        return inheritedIndentation;
                    }
                    const childStartPos = child.getStart(sourceFile);
                    const childStartLine = sourceFile.getLineAndCharacterOfPosition(childStartPos).line;
                    let undecoratedChildStartLine = childStartLine;
                    if (hasDecorators(child)) {
                        undecoratedChildStartLine = sourceFile.getLineAndCharacterOfPosition(getNonDecoratorTokenPosOfNode(child, sourceFile)).line;
                    }
                    let childIndentationAmount = -1 /* Unknown */;
                    if (isListItem && rangeContainsRange(originalRange, parent2)) {
                        childIndentationAmount = tryComputeIndentationForListItem(childStartPos, child.end, parentStartLine, originalRange, inheritedIndentation);
                        if (childIndentationAmount !== -1 /* Unknown */) {
                            inheritedIndentation = childIndentationAmount;
                        }
                    }
                    if (!rangeOverlapsWithStartEnd(originalRange, child.pos, child.end)) {
                        if (child.end < originalRange.pos) {
                            formattingScanner.skipToEndOf(child);
                        }
                        return inheritedIndentation;
                    }
                    if (child.getFullWidth() === 0) {
                        return inheritedIndentation;
                    }
                    while (formattingScanner.isOnToken() && formattingScanner.getStartPos() < originalRange.end) {
                        const tokenInfo = formattingScanner.readTokenInfo(node);
                        if (tokenInfo.token.end > originalRange.end) {
                            return inheritedIndentation;
                        }
                        if (tokenInfo.token.end > childStartPos) {
                            if (tokenInfo.token.pos > childStartPos) {
                                formattingScanner.skipToStartOf(child);
                            }
                            break;
                        }
                        consumeTokenAndAdvanceScanner(tokenInfo, node, parentDynamicIndentation, node);
                    }
                    if (!formattingScanner.isOnToken() || formattingScanner.getStartPos() >= originalRange.end) {
                        return inheritedIndentation;
                    }
                    if (isToken(child)) {
                        const tokenInfo = formattingScanner.readTokenInfo(child);
                        if (child.kind !== 11 /* JsxText */) {
                            Debug.assert(tokenInfo.token.end === child.end, "Token end is child end");
                            consumeTokenAndAdvanceScanner(tokenInfo, node, parentDynamicIndentation, child);
                            return inheritedIndentation;
                        }
                    }
                    const effectiveParentStartLine = child.kind === 167 /* Decorator */ ? childStartLine : undecoratedParentStartLine;
                    const childIndentation = computeIndentation(child, childStartLine, childIndentationAmount, node, parentDynamicIndentation, effectiveParentStartLine);
                    processNode(child, childContextNode, childStartLine, undecoratedChildStartLine, childIndentation.indentation, childIndentation.delta);
                    childContextNode = node;
                    if (isFirstListItem && parent2.kind === 206 /* ArrayLiteralExpression */ && inheritedIndentation === -1 /* Unknown */) {
                        inheritedIndentation = childIndentation.indentation;
                    }
                    return inheritedIndentation;
                }
            function processPair(currentItem, currentStartLine, currentParent, previousItem, previousStartLine, previousParent2, contextNode, dynamicIndentation) {