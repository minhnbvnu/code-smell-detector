function spanInWhileKeyword(node2) {
                    if (node2.parent.kind === 243 /* DoStatement */) {
                        return textSpanEndingAtNextToken(node2, node2.parent.expression);
                    }
                    return spanInNode(node2.parent);
                }