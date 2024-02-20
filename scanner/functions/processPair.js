function processPair(currentItem, currentStartLine, currentParent, previousItem, previousStartLine, previousParent2, contextNode, dynamicIndentation) {
                formattingContext.updateContext(previousItem, previousParent2, currentItem, currentParent, contextNode);
                const rules = getRules(formattingContext);
                let trimTrailingWhitespaces = formattingContext.options.trimTrailingWhitespace !== false;
                let lineAction = 0 /* None */;
                if (rules) {
                    forEachRight(rules, (rule2) => {
                        lineAction = applyRuleEdits(rule2, previousItem, previousStartLine, currentItem, currentStartLine);
                        if (dynamicIndentation) {
                            switch (lineAction) {
                                case 2 /* LineRemoved */:
                                    if (currentParent.getStart(sourceFile) === currentItem.pos) {
                                        dynamicIndentation.recomputeIndentation(
                                        /*lineAddedByFormatting*/
                                        false, contextNode);
                                    }
                                    break;
                                case 1 /* LineAdded */:
                                    if (currentParent.getStart(sourceFile) === currentItem.pos) {
                                        dynamicIndentation.recomputeIndentation(
                                        /*lineAddedByFormatting*/
                                        true, contextNode);
                                    }
                                    break;
                                default:
                                    Debug.assert(lineAction === 0 /* None */);
                            }
                        }
                        trimTrailingWhitespaces = trimTrailingWhitespaces && !(rule2.action & 16 /* DeleteSpace */) && rule2.flags !== 1 /* CanDeleteNewLines */;
                    });
                }
                else {
                    trimTrailingWhitespaces = trimTrailingWhitespaces && currentItem.kind !== 1 /* EndOfFileToken */;
                }
                if (currentStartLine !== previousStartLine && trimTrailingWhitespaces) {
                    trimTrailingWhitespacesForLines(previousStartLine, currentStartLine, previousItem);
                }
                return lineAction;
            }