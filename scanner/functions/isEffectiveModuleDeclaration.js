function isEffectiveModuleDeclaration(node) {
            return isModuleDeclaration(node) || isIdentifier(node);
        }