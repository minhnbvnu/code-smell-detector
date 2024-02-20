function getTypeArgumentsForAliasSymbol(symbol) {
                return symbol ? getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol) : void 0;
            }