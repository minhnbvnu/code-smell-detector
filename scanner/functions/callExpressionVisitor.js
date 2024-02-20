function callExpressionVisitor(node) {
                if (node.kind === 106 /* SuperKeyword */) {
                    return visitSuperKeyword(
                    /*isExpressionOfCall*/
                    true);
                }
                return visitor(node);
            }