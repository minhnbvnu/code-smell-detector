function fromRoot(sym, kind) {
                            return firstDefined(checker.getRootSymbols(sym), (rootSymbol) => cbSymbol(sym, rootSymbol, 
                            /*baseSymbol*/
                            void 0, kind) || (rootSymbol.parent && rootSymbol.parent.flags & (32 /* Class */ | 64 /* Interface */) && allowBaseTypes(rootSymbol) ? getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.name, checker, (base) => cbSymbol(sym, rootSymbol, base, kind)) : void 0));
                        }