function preserveCommentsOn(node) {
                        var _a3;
                        if (some(propertySymbol.declarations, (d) => d.kind === 351 /* JSDocPropertyTag */)) {
                            const d = (_a3 = propertySymbol.declarations) == null ? void 0 : _a3.find((d2) => d2.kind === 351 /* JSDocPropertyTag */);
                            const commentText = getTextOfJSDocComment(d.comment);
                            if (commentText) {
                                setSyntheticLeadingComments(node, [{ kind: 3 /* MultiLineCommentTrivia */, text: "*\n * " + commentText.replace(/\n/g, "\n * ") + "\n ", pos: -1, end: -1, hasTrailingNewLine: true }]);
                            }
                        }
                        else if (propertySymbol.valueDeclaration) {
                            setCommentRange(node, propertySymbol.valueDeclaration);
                        }
                        return node;
                    }