function parseEnumTag(start2, tagName, margin, indentText) {
                                const typeExpression = parseJSDocTypeExpression(
                                /*mayOmitBraces*/
                                true);
                                skipWhitespace();
                                return finishNode(factory2.createJSDocEnumTag(tagName, typeExpression, parseTrailingTagComments(start2, getNodePos(), margin, indentText)), start2);
                            }