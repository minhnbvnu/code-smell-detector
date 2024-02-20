function spanInOpenParenToken(node2) {
                    if (node2.parent.kind === 243 /* DoStatement */ || // Go to while keyword and do action instead
                        node2.parent.kind === 210 /* CallExpression */ || node2.parent.kind === 211 /* NewExpression */) {
                        return spanInPreviousNode(node2);
                    }
                    if (node2.parent.kind === 214 /* ParenthesizedExpression */) {
                        return spanInNextNode(node2);
                    }
                    return spanInNode(node2.parent);
                }