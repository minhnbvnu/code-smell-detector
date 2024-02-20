function spanInGreaterThanOrLessThanToken(node2) {
                    if (node2.parent.kind === 213 /* TypeAssertionExpression */) {
                        return spanInNextNode(node2);
                    }
                    return spanInNode(node2.parent);
                }