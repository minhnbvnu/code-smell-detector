function spanInColonToken(node2) {
                    if (isFunctionLike(node2.parent) || node2.parent.kind === 299 /* PropertyAssignment */ || node2.parent.kind === 166 /* Parameter */) {
                        return spanInPreviousNode(node2);
                    }
                    return spanInNode(node2.parent);
                }