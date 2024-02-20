function symbolPointsToNonPrivateAndAbstractMember(symbol) {
            const flags = getSyntacticModifierFlags(first(symbol.getDeclarations()));
            return !(flags & 8 /* Private */) && !!(flags & 256 /* Abstract */);
        }