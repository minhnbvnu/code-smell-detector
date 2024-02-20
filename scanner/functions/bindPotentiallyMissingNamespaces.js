function bindPotentiallyMissingNamespaces(namespaceSymbol, entityName, isToplevel, isPrototypeProperty, containerIsClass) {
                if ((namespaceSymbol == null ? void 0 : namespaceSymbol.flags) & 2097152 /* Alias */) {
                    return namespaceSymbol;
                }
                if (isToplevel && !isPrototypeProperty) {
                    const flags = 1536 /* Module */ | 67108864 /* Assignment */;
                    const excludeFlags = 110735 /* ValueModuleExcludes */ & ~67108864 /* Assignment */;
                    namespaceSymbol = forEachIdentifierInEntityName(entityName, namespaceSymbol, (id, symbol, parent3) => {
                        if (symbol) {
                            addDeclarationToSymbol(symbol, id, flags);
                            return symbol;
                        }
                        else {
                            const table = parent3 ? parent3.exports : file.jsGlobalAugmentations || (file.jsGlobalAugmentations = createSymbolTable());
                            return declareSymbol(table, parent3, id, flags, excludeFlags);
                        }
                    });
                }
                if (containerIsClass && namespaceSymbol && namespaceSymbol.valueDeclaration) {
                    addDeclarationToSymbol(namespaceSymbol, namespaceSymbol.valueDeclaration, 32 /* Class */);
                }
                return namespaceSymbol;
            }