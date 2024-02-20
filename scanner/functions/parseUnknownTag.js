function parseUnknownTag(start2, tagName, indent2, indentText) {
                                return finishNode(factory2.createJSDocUnknownTag(tagName, parseTrailingTagComments(start2, getNodePos(), indent2, indentText)), start2);
                            }