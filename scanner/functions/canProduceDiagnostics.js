function canProduceDiagnostics(node) {
            return isVariableDeclaration(node) || isPropertyDeclaration(node) || isPropertySignature(node) || isBindingElement(node) || isSetAccessor(node) || isGetAccessor(node) || isConstructSignatureDeclaration(node) || isCallSignatureDeclaration(node) || isMethodDeclaration(node) || isMethodSignature(node) || isFunctionDeclaration(node) || isParameter(node) || isTypeParameterDeclaration(node) || isExpressionWithTypeArguments(node) || isImportEqualsDeclaration(node) || isTypeAliasDeclaration(node) || isConstructorDeclaration(node) || isIndexSignatureDeclaration(node) || isPropertyAccessExpression(node) || isJSDocTypeAlias(node);
        }