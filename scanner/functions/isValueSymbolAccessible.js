function isValueSymbolAccessible(typeSymbol, enclosingDeclaration) {
                const access = isSymbolAccessibleWorker(typeSymbol, enclosingDeclaration, 111551 /* Value */, 
                /*shouldComputeAliasesToMakeVisible*/
                false, 
                /*allowModules*/
                true);
                return access.accessibility === 0 /* Accessible */;
            }