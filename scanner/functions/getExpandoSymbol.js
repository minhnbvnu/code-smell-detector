function getExpandoSymbol(symbol) {
                const decl = symbol.valueDeclaration;
                if (!decl || !isInJSFile(decl) || symbol.flags & 524288 /* TypeAlias */ || getExpandoInitializer(decl, 
                /*isPrototypeAssignment*/
                false)) {
                    return void 0;
                }
                const init = isVariableDeclaration(decl) ? getDeclaredExpandoInitializer(decl) : getAssignedExpandoInitializer(decl);
                if (init) {
                    const initSymbol = getSymbolOfNode(init);
                    if (initSymbol) {
                        return mergeJSSymbols(initSymbol, symbol);
                    }
                }
            }