function tryCreateAwaitedType(type) {
                const awaitedSymbol = getGlobalAwaitedSymbol(
                /*reportErrors*/
                true);
                if (awaitedSymbol) {
                    return getTypeAliasInstantiation(awaitedSymbol, [unwrapAwaitedType(type)]);
                }
                return void 0;
            }