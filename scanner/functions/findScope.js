function findScope(node) {
            if (findAncestor(node, isJsxExpression)) {
                const returnStatement = findAncestor(node.parent, isReturnStatement);
                if (returnStatement)
                    return returnStatement;
            }
            return getSourceFileOfNode(node);
        }