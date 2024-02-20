function isAcceptedDeclaration(node) {
            return isParameterPropertyDeclaration(node, node.parent) || isPropertyDeclaration(node) || isPropertyAssignment(node);
        }