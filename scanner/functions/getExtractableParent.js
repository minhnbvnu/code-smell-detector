function getExtractableParent(node) {
            return findAncestor(node, (node2) => node2.parent && isExtractableExpression(node2) && !isBinaryExpression(node2.parent));
        }