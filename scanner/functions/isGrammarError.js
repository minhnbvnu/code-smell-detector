function isGrammarError(parent2, child) {
            if (isTypeParameterDeclaration(parent2))
                return child === parent2.expression;
            if (isClassStaticBlockDeclaration(parent2))
                return child === parent2.modifiers;
            if (isPropertySignature(parent2))
                return child === parent2.initializer;
            if (isPropertyDeclaration(parent2))
                return child === parent2.questionToken && isAutoAccessorPropertyDeclaration(parent2);
            if (isPropertyAssignment(parent2))
                return child === parent2.modifiers || child === parent2.questionToken || child === parent2.exclamationToken || isGrammarErrorElement(parent2.modifiers, child, isModifierLike);
            if (isShorthandPropertyAssignment(parent2))
                return child === parent2.equalsToken || child === parent2.modifiers || child === parent2.questionToken || child === parent2.exclamationToken || isGrammarErrorElement(parent2.modifiers, child, isModifierLike);
            if (isMethodDeclaration(parent2))
                return child === parent2.exclamationToken;
            if (isConstructorDeclaration(parent2))
                return child === parent2.typeParameters || child === parent2.type || isGrammarErrorElement(parent2.typeParameters, child, isTypeParameterDeclaration);
            if (isGetAccessorDeclaration(parent2))
                return child === parent2.typeParameters || isGrammarErrorElement(parent2.typeParameters, child, isTypeParameterDeclaration);
            if (isSetAccessorDeclaration(parent2))
                return child === parent2.typeParameters || child === parent2.type || isGrammarErrorElement(parent2.typeParameters, child, isTypeParameterDeclaration);
            if (isNamespaceExportDeclaration(parent2))
                return child === parent2.modifiers || isGrammarErrorElement(parent2.modifiers, child, isModifierLike);
            return false;
        }