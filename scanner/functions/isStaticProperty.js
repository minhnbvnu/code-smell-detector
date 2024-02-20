function isStaticProperty(symbol) {
            return !!(symbol.valueDeclaration && getEffectiveModifierFlags(symbol.valueDeclaration) & 32 /* Static */ && isClassLike(symbol.valueDeclaration.parent));
        }