function symbolPointsToNonPrivateMember(symbol) {
            return !symbol.valueDeclaration || !(getEffectiveModifierFlags(symbol.valueDeclaration) & 8 /* Private */);
        }