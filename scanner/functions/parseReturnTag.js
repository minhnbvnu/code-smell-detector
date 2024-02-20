function parseReturnTag(start2, tagName, indent2, indentText) {
                                if (some(tags, isJSDocReturnTag)) {
                                    parseErrorAt(tagName.pos, scanner2.getTokenPos(), Diagnostics._0_tag_already_specified, tagName.escapedText);
                                }
                                const typeExpression = tryParseTypeExpression();
                                return finishNode(factory2.createJSDocReturnTag(tagName, typeExpression, parseTrailingTagComments(start2, getNodePos(), indent2, indentText)), start2);
                            }