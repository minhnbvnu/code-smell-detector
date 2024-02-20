function getPropertySymbolsFromBaseTypes(symbol, propertyName, checker, cb) {
                        const seen = /* @__PURE__ */ new Map();
                        return recur(symbol);
                        function recur(symbol2) {
                            if (!(symbol2.flags & (32 /* Class */ | 64 /* Interface */)) || !addToSeen(seen, getSymbolId(symbol2)))
                                return;
                            return firstDefined(symbol2.declarations, (declaration) => firstDefined(getAllSuperTypeNodes(declaration), (typeReference) => {
                                const type = checker.getTypeAtLocation(typeReference);
                                const propertySymbol = type && type.symbol && checker.getPropertyOfType(type, propertyName);
                                return type && propertySymbol && (firstDefined(checker.getRootSymbols(propertySymbol), cb) || recur(type.symbol));
                            }));
                        }
                    }