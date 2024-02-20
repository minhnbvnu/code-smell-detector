function parseThrowsTag(start2, tagName, indent2, indentText) {
                                const typeExpression = tryParseTypeExpression();
                                const comment = parseTrailingTagComments(start2, getNodePos(), indent2, indentText);
                                return finishNode(factory2.createJSDocThrowsTag(tagName, typeExpression, comment), start2);
                            }