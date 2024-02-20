function parseSeeTag(start2, tagName, indent2, indentText) {
                                const isMarkdownOrJSDocLink = token() === 22 /* OpenBracketToken */ || lookAhead(() => nextTokenJSDoc() === 59 /* AtToken */ && tokenIsIdentifierOrKeyword(nextTokenJSDoc()) && isJSDocLinkTag(scanner2.getTokenValue()));
                                const nameExpression = isMarkdownOrJSDocLink ? void 0 : parseJSDocNameReference();
                                const comments2 = indent2 !== void 0 && indentText !== void 0 ? parseTrailingTagComments(start2, getNodePos(), indent2, indentText) : void 0;
                                return finishNode(factory2.createJSDocSeeTag(tagName, nameExpression, comments2), start2);
                            }