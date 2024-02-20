function parseAuthorTag(start2, tagName, indent2, indentText) {
                                const commentStart = getNodePos();
                                const textOnly = parseAuthorNameAndEmail();
                                let commentEnd = scanner2.getStartPos();
                                const comments2 = parseTrailingTagComments(start2, commentEnd, indent2, indentText);
                                if (!comments2) {
                                    commentEnd = scanner2.getStartPos();
                                }
                                const allParts = typeof comments2 !== "string" ? createNodeArray(concatenate([finishNode(textOnly, commentStart, commentEnd)], comments2), commentStart) : textOnly.text + comments2;
                                return finishNode(factory2.createJSDocAuthorTag(tagName, allParts), start2);
                            }