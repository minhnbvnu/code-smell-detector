function getExternalModuleMember(node, specifier, dontResolveAlias = false) {
                var _a2;
                const moduleSpecifier = getExternalModuleRequireArgument(node) || node.moduleSpecifier;
                const moduleSymbol = resolveExternalModuleName(node, moduleSpecifier);
                const name = !isPropertyAccessExpression(specifier) && specifier.propertyName || specifier.name;
                if (!isIdentifier(name)) {
                    return void 0;
                }
                const suppressInteropError = name.escapedText === "default" /* Default */ && allowSyntheticDefaultImports;
                const targetSymbol = resolveESModuleSymbol(moduleSymbol, moduleSpecifier, 
                /*dontResolveAlias*/
                false, suppressInteropError);
                if (targetSymbol) {
                    if (name.escapedText) {
                        if (isShorthandAmbientModuleSymbol(moduleSymbol)) {
                            return moduleSymbol;
                        }
                        let symbolFromVariable;
                        if (moduleSymbol && moduleSymbol.exports && moduleSymbol.exports.get("export=" /* ExportEquals */)) {
                            symbolFromVariable = getPropertyOfType(getTypeOfSymbol(targetSymbol), name.escapedText, 
                            /*skipObjectFunctionPropertyAugment*/
                            true);
                        }
                        else {
                            symbolFromVariable = getPropertyOfVariable(targetSymbol, name.escapedText);
                        }
                        symbolFromVariable = resolveSymbol(symbolFromVariable, dontResolveAlias);
                        let symbolFromModule = getExportOfModule(targetSymbol, name, specifier, dontResolveAlias);
                        if (symbolFromModule === void 0 && name.escapedText === "default" /* Default */) {
                            const file = (_a2 = moduleSymbol.declarations) == null ? void 0 : _a2.find(isSourceFile);
                            if (isOnlyImportedAsDefault(moduleSpecifier) || canHaveSyntheticDefault(file, moduleSymbol, dontResolveAlias, moduleSpecifier)) {
                                symbolFromModule = resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias) || resolveSymbol(moduleSymbol, dontResolveAlias);
                            }
                        }
                        const symbol = symbolFromModule && symbolFromVariable && symbolFromModule !== symbolFromVariable ? combineValueAndTypeSymbols(symbolFromVariable, symbolFromModule) : symbolFromModule || symbolFromVariable;
                        if (!symbol) {
                            errorNoModuleMemberSymbol(moduleSymbol, targetSymbol, node, name);
                        }
                        return symbol;
                    }
                }
            }