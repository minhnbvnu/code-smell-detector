function mergeJSSymbols(target, source) {
                var _a2, _b;
                if (source) {
                    const links = getSymbolLinks(source);
                    if (!links.inferredClassSymbol || !links.inferredClassSymbol.has(getSymbolId(target))) {
                        const inferred = isTransientSymbol(target) ? target : cloneSymbol(target);
                        inferred.exports = inferred.exports || createSymbolTable();
                        inferred.members = inferred.members || createSymbolTable();
                        inferred.flags |= source.flags & 32 /* Class */;
                        if ((_a2 = source.exports) == null ? void 0 : _a2.size) {
                            mergeSymbolTable(inferred.exports, source.exports);
                        }
                        if ((_b = source.members) == null ? void 0 : _b.size) {
                            mergeSymbolTable(inferred.members, source.members);
                        }
                        (links.inferredClassSymbol || (links.inferredClassSymbol = /* @__PURE__ */ new Map())).set(getSymbolId(inferred), inferred);
                        return inferred;
                    }
                    return links.inferredClassSymbol.get(getSymbolId(target));
                }
            }