function getExportOfModule(symbol, name, specifier, dontResolveAlias) {
                var _a2;
                if (symbol.flags & 1536 /* Module */) {
                    const exportSymbol = getExportsOfSymbol(symbol).get(name.escapedText);
                    const resolved = resolveSymbol(exportSymbol, dontResolveAlias);
                    const exportStarDeclaration = (_a2 = getSymbolLinks(symbol).typeOnlyExportStarMap) == null ? void 0 : _a2.get(name.escapedText);
                    markSymbolOfAliasDeclarationIfTypeOnly(specifier, exportSymbol, resolved, 
                    /*overwriteEmpty*/
                    false, exportStarDeclaration, name.escapedText);
                    return resolved;
                }
            }