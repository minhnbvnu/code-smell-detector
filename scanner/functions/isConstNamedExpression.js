function isConstNamedExpression(node) {
            return (isFunctionExpression(node) || isArrowFunction(node) || isClassExpression(node)) && isVariableDeclaration(node.parent) && node === node.parent.initializer && isIdentifier(node.parent.name) && !!(getCombinedNodeFlags(node.parent) & 2 /* Const */);
        }