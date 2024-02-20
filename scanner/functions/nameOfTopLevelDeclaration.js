function nameOfTopLevelDeclaration(d) {
            return isExpressionStatement(d) ? tryCast(d.expression.left.name, isIdentifier) : tryCast(d.name, isIdentifier);
        }