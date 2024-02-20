function isNamedExpression(node) {
            return (isFunctionExpression(node) || isClassExpression(node)) && isNamedDeclaration(node);
        }