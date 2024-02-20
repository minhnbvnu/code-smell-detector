function getSuggestedSymbolForNonexistentSymbol(location, outerName, meaning) {
                Debug.assert(outerName !== void 0, "outername should always be defined");
                const result = resolveNameHelper(location, outerName, meaning, 
                /*nameNotFoundMessage*/
                void 0, outerName, 
                /*isUse*/
                false, 
                /*excludeGlobals*/
                false, 
                /*getSpellingSuggestions*/
                true, (symbols, name, meaning2) => {
                    Debug.assertEqual(outerName, name, "name should equal outerName");
                    const symbol = getSymbol2(symbols, name, meaning2);
                    if (symbol)
                        return symbol;
                    let candidates;
                    if (symbols === globals) {
                        const primitives = mapDefined(["string", "number", "boolean", "object", "bigint", "symbol"], (s) => symbols.has(s.charAt(0).toUpperCase() + s.slice(1)) ? createSymbol(524288 /* TypeAlias */, s) : void 0);
                        candidates = primitives.concat(arrayFrom(symbols.values()));
                    }
                    else {
                        candidates = arrayFrom(symbols.values());
                    }
                    return getSpellingSuggestionForName(unescapeLeadingUnderscores(name), candidates, meaning2);
                });
                return result;
            }