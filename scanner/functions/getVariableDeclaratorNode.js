function getVariableDeclaratorNode(node) {
                return getParentNodeByType(node, "VariableDeclarator");
            }