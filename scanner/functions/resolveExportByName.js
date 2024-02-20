function resolveExportByName(moduleSymbol, name, sourceNode, dontResolveAlias) {
                const exportValue = moduleSymbol.exports.get("export=" /* ExportEquals */);
                const exportSymbol = exportValue ? getPropertyOfType(getTypeOfSymbol(exportValue), name, 
                /*skipObjectFunctionPropertyAugment*/
                true) : moduleSymbol.exports.get(name);
                const resolved = resolveSymbol(exportSymbol, dontResolveAlias);
                markSymbolOfAliasDeclarationIfTypeOnly(sourceNode, exportSymbol, resolved, 
                /*overwriteEmpty*/
                false);
                return resolved;
            }