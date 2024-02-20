function parseOverloadTag(start2, tagName, indent2, indentText) {
                                skipWhitespace();
                                let comment = parseTagComments(indent2);
                                const typeExpression = parseJSDocSignature(start2, indent2);
                                if (!comment) {
                                    comment = parseTrailingTagComments(start2, getNodePos(), indent2, indentText);
                                }
                                const end2 = comment !== void 0 ? getNodePos() : typeExpression.end;
                                return finishNode(factory2.createJSDocOverloadTag(tagName, typeExpression, comment), start2, end2);
                            }