function isPossibleCallHierarchyDeclaration(node) {
            return isSourceFile(node) || isModuleDeclaration(node) || isFunctionDeclaration(node) || isFunctionExpression(node) || isClassDeclaration(node) || isClassExpression(node) || isClassStaticBlockDeclaration(node) || isMethodDeclaration(node) || isMethodSignature(node) || isGetAccessorDeclaration(node) || isSetAccessorDeclaration(node);
        }