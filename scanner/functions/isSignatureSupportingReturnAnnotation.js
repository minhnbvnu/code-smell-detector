function isSignatureSupportingReturnAnnotation(node) {
                return isArrowFunction(node) || isFunctionExpression(node) || isFunctionDeclaration(node) || isMethodDeclaration(node) || isGetAccessorDeclaration(node);
            }