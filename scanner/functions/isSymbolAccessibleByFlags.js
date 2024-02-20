function isSymbolAccessibleByFlags(typeSymbol, enclosingDeclaration, flags) {
                const access = isSymbolAccessibleWorker(typeSymbol, enclosingDeclaration, flags, 
                /*shouldComputeAliasesToMakeVisible*/
                false, 
                /*allowModules*/
                false);
                return access.accessibility === 0 /* Accessible */;
            }