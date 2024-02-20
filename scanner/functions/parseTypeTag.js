function parseTypeTag(start2, tagName, indent2, indentText) {
                                if (some(tags, isJSDocTypeTag)) {
                                    parseErrorAt(tagName.pos, scanner2.getTokenPos(), Diagnostics._0_tag_already_specified, tagName.escapedText);
                                }
                                const typeExpression = parseJSDocTypeExpression(
                                /*mayOmitBraces*/
                                true);
                                const comments2 = indent2 !== void 0 && indentText !== void 0 ? parseTrailingTagComments(start2, getNodePos(), indent2, indentText) : void 0;
                                return finishNode(factory2.createJSDocTypeTag(tagName, typeExpression, comments2), start2);
                            }