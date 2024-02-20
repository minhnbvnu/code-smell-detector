function explicitlyInheritsFrom(symbol, parent2, cachedResults, checker) {
                        if (symbol === parent2) {
                            return true;
                        }
                        const key = getSymbolId(symbol) + "," + getSymbolId(parent2);
                        const cached = cachedResults.get(key);
                        if (cached !== void 0) {
                            return cached;
                        }
                        cachedResults.set(key, false);
                        const inherits = !!symbol.declarations && symbol.declarations.some((declaration) => getAllSuperTypeNodes(declaration).some((typeReference) => {
                            const type = checker.getTypeAtLocation(typeReference);
                            return !!type && !!type.symbol && explicitlyInheritsFrom(type.symbol, parent2, cachedResults, checker);
                        }));
                        cachedResults.set(key, inherits);
                        return inherits;
                    }