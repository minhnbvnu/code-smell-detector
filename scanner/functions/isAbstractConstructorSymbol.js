function isAbstractConstructorSymbol(symbol) {
            if (symbol.flags & 32 /* Class */) {
                const declaration = getClassLikeDeclarationOfSymbol(symbol);
                return !!declaration && hasSyntacticModifier(declaration, 256 /* Abstract */);
            }
            return false;
        }