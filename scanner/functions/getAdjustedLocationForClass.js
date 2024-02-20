function getAdjustedLocationForClass(node) {
            if (isNamedDeclaration(node)) {
                return node.name;
            }
            if (isClassDeclaration(node)) {
                const defaultModifier = node.modifiers && find(node.modifiers, isDefaultModifier2);
                if (defaultModifier)
                    return defaultModifier;
            }
            if (isClassExpression(node)) {
                const classKeyword = find(node.getChildren(), isClassKeyword);
                if (classKeyword)
                    return classKeyword;
            }
        }