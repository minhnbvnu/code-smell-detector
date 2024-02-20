function getGlobalTypeAliasSymbol(name, arity, reportErrors2) {
                const symbol = getGlobalSymbol(name, 788968 /* Type */, reportErrors2 ? Diagnostics.Cannot_find_global_type_0 : void 0);
                if (symbol) {
                    getDeclaredTypeOfSymbol(symbol);
                    if (length(getSymbolLinks(symbol).typeParameters) !== arity) {
                        const decl = symbol.declarations && find(symbol.declarations, isTypeAliasDeclaration);
                        error(decl, Diagnostics.Global_type_0_must_have_1_type_parameter_s, symbolName(symbol), arity);
                        return void 0;
                    }
                }
                return symbol;
            }