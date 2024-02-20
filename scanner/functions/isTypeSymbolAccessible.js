function isTypeSymbolAccessible(typeSymbol, enclosingDeclaration) {
                const access = isSymbolAccessibleWorker(typeSymbol, enclosingDeclaration, 788968 /* Type */, 
                /*shouldComputeAliasesToMakeVisible*/
                false, 
                /*allowModules*/
                true);
                return access.accessibility === 0 /* Accessible */;
            }