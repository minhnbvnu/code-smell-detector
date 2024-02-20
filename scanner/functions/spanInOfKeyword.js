function spanInOfKeyword(node2) {
                    if (node2.parent.kind === 247 /* ForOfStatement */) {
                        return spanInNextNode(node2);
                    }
                    return spanInNode(node2.parent);
                }