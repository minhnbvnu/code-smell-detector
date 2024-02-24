function isValidCallHierarchyDeclaration(node) {
            return isSourceFile(node) || isModuleDeclaration(node) && isIdentifier(node.name) || isFunctionDeclaration(node) || isClassDeclaration(node) || isClassStaticBlockDeclaration(node) || isMethodDeclaration(node) || isMethodSignature(node) || isGetAccessorDeclaration(node) || isSetAccessorDeclaration(node) || isNamedExpression(node) || isConstNamedExpression(node);
        }