function getSymbolNameForPrivateIdentifier(containingClassSymbol, description2) {
            return `__#${getSymbolId(containingClassSymbol)}@${description2}`;
        }