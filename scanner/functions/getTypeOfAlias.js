function getTypeOfAlias(symbol) {
                const links = getSymbolLinks(symbol);
                if (!links.type) {
                    const targetSymbol = resolveAlias(symbol);
                    const exportSymbol = symbol.declarations && getTargetOfAliasDeclaration(getDeclarationOfAliasSymbol(symbol), 
                    /*dontResolveAlias*/
                    true);
                    const declaredType = firstDefined(exportSymbol == null ? void 0 : exportSymbol.declarations, (d) => isExportAssignment(d) ? tryGetTypeFromEffectiveTypeNode(d) : void 0);
                    links.type = (exportSymbol == null ? void 0 : exportSymbol.declarations) && isDuplicatedCommonJSExport(exportSymbol.declarations) && symbol.declarations.length ? getFlowTypeFromCommonJSExport(exportSymbol) : isDuplicatedCommonJSExport(symbol.declarations) ? autoType : declaredType ? declaredType : getAllSymbolFlags(targetSymbol) & 111551 /* Value */ ? getTypeOfSymbol(targetSymbol) : errorType;
                }
                return links.type;
            }