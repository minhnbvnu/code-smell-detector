function findImplementation(typeChecker, node) {
            if (node.body) {
                return node;
            }
            if (isConstructorDeclaration(node)) {
                return getFirstConstructorWithBody(node.parent);
            }
            if (isFunctionDeclaration(node) || isMethodDeclaration(node)) {
                const symbol = getSymbolOfCallHierarchyDeclaration(typeChecker, node);
                if (symbol && symbol.valueDeclaration && isFunctionLikeDeclaration(symbol.valueDeclaration) && symbol.valueDeclaration.body) {
                    return symbol.valueDeclaration;
                }
                return void 0;
            }
            return node;
        }