function parseSatisfiesTag(start2, tagName, margin, indentText) {
                                const typeExpression = parseJSDocTypeExpression(
                                /*mayOmitBraces*/
                                false);
                                const comments2 = margin !== void 0 && indentText !== void 0 ? parseTrailingTagComments(start2, getNodePos(), margin, indentText) : void 0;
                                return finishNode(factory2.createJSDocSatisfiesTag(tagName, typeExpression, comments2), start2);
                            }