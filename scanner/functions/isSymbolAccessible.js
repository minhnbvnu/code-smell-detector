function isSymbolAccessible(symbol, enclosingDeclaration, meaning, shouldComputeAliasesToMakeVisible) {
                return isSymbolAccessibleWorker(symbol, enclosingDeclaration, meaning, shouldComputeAliasesToMakeVisible, 
                /*allowModules*/
                true);
            }