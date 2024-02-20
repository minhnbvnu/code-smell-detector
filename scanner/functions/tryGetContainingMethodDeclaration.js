function tryGetContainingMethodDeclaration(node, callExpression) {
            if (isTypeLiteralNode(node)) {
                return void 0;
            }
            const declaration = findAncestor(callExpression, (n) => isMethodDeclaration(n) || isConstructorDeclaration(n));
            return declaration && declaration.parent === node ? declaration : void 0;
        }