function getTypeOnlyAliasDeclaration(symbol, include) {
                if (!(symbol.flags & 2097152 /* Alias */)) {
                    return void 0;
                }
                const links = getSymbolLinks(symbol);
                if (include === void 0) {
                    return links.typeOnlyDeclaration || void 0;
                }
                if (links.typeOnlyDeclaration) {
                    const resolved = links.typeOnlyDeclaration.kind === 275 /* ExportDeclaration */ ? resolveSymbol(getExportsOfModule(links.typeOnlyDeclaration.symbol.parent).get(links.typeOnlyExportStarName || symbol.escapedName)) : resolveAlias(links.typeOnlyDeclaration.symbol);
                    return getAllSymbolFlags(resolved) & include ? links.typeOnlyDeclaration : void 0;
                }
                return void 0;
            }