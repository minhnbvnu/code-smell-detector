function parseImplementsTag(start2, tagName, margin, indentText) {
                                const className = parseExpressionWithTypeArgumentsForAugments();
                                return finishNode(factory2.createJSDocImplementsTag(tagName, className, parseTrailingTagComments(start2, getNodePos(), margin, indentText)), start2);
                            }