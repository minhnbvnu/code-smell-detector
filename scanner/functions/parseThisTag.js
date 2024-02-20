function parseThisTag(start2, tagName, margin, indentText) {
                                const typeExpression = parseJSDocTypeExpression(
                                /*mayOmitBraces*/
                                true);
                                skipWhitespace();
                                return finishNode(factory2.createJSDocThisTag(tagName, typeExpression, parseTrailingTagComments(start2, getNodePos(), margin, indentText)), start2);
                            }