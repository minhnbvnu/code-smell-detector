function getTypeOfFuncClassEnumModule(symbol) {
                let links = getSymbolLinks(symbol);
                const originalLinks = links;
                if (!links.type) {
                    const expando = symbol.valueDeclaration && getSymbolOfExpando(symbol.valueDeclaration, 
                    /*allowDeclaration*/
                    false);
                    if (expando) {
                        const merged = mergeJSSymbols(symbol, expando);
                        if (merged) {
                            symbol = merged;
                            links = merged.links;
                        }
                    }
                    originalLinks.type = links.type = getTypeOfFuncClassEnumModuleWorker(symbol);
                }
                return links.type;
            }