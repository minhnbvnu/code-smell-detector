function getPropertyNameForKnownSymbolName(symbolName2) {
                const ctorType = getGlobalESSymbolConstructorSymbol(
                /*reportErrors*/
                false);
                const uniqueType = ctorType && getTypeOfPropertyOfType(getTypeOfSymbol(ctorType), escapeLeadingUnderscores(symbolName2));
                return uniqueType && isTypeUsableAsPropertyName(uniqueType) ? getPropertyNameFromType(uniqueType) : `__@${symbolName2}`;
            }