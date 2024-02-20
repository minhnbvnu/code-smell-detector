function getAdjustedLocationForFunction(node) {
            if (isNamedDeclaration(node)) {
                return node.name;
            }
            if (isFunctionDeclaration(node)) {
                const defaultModifier = find(node.modifiers, isDefaultModifier2);
                if (defaultModifier)
                    return defaultModifier;
            }
            if (isFunctionExpression(node)) {
                const functionKeyword = find(node.getChildren(), isFunctionKeyword);
                if (functionKeyword)
                    return functionKeyword;
            }
        }