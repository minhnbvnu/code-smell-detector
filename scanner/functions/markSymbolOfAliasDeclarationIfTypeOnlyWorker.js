function markSymbolOfAliasDeclarationIfTypeOnlyWorker(aliasDeclarationLinks, target, overwriteEmpty) {
                var _a2, _b, _c;
                if (target && (aliasDeclarationLinks.typeOnlyDeclaration === void 0 || overwriteEmpty && aliasDeclarationLinks.typeOnlyDeclaration === false)) {
                    const exportSymbol = (_b = (_a2 = target.exports) == null ? void 0 : _a2.get("export=" /* ExportEquals */)) != null ? _b : target;
                    const typeOnly = exportSymbol.declarations && find(exportSymbol.declarations, isTypeOnlyImportOrExportDeclaration);
                    aliasDeclarationLinks.typeOnlyDeclaration = (_c = typeOnly != null ? typeOnly : getSymbolLinks(exportSymbol).typeOnlyDeclaration) != null ? _c : false;
                }
                return !!aliasDeclarationLinks.typeOnlyDeclaration;
            }