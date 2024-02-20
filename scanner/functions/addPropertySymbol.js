function addPropertySymbol(symbol, insertAwait, insertQuestionDot) {
                var _a2;
                const computedPropertyName = firstDefined(symbol.declarations, (decl) => tryCast(getNameOfDeclaration(decl), isComputedPropertyName));
                if (computedPropertyName) {
                    const leftMostName = getLeftMostName(computedPropertyName.expression);
                    const nameSymbol = leftMostName && typeChecker.getSymbolAtLocation(leftMostName);
                    const firstAccessibleSymbol = nameSymbol && getFirstSymbolInChain(nameSymbol, contextToken, typeChecker);
                    if (firstAccessibleSymbol && addToSeen(seenPropertySymbols, getSymbolId(firstAccessibleSymbol))) {
                        const index = symbols.length;
                        symbols.push(firstAccessibleSymbol);
                        const moduleSymbol = firstAccessibleSymbol.parent;
                        if (!moduleSymbol || !isExternalModuleSymbol(moduleSymbol) || typeChecker.tryGetMemberInModuleExportsAndProperties(firstAccessibleSymbol.name, moduleSymbol) !== firstAccessibleSymbol) {
                            symbolToOriginInfoMap[index] = { kind: getNullableSymbolOriginInfoKind(2 /* SymbolMemberNoExport */) };
                        }
                        else {
                            const fileName = isExternalModuleNameRelative(stripQuotes(moduleSymbol.name)) ? (_a2 = getSourceFileOfModule(moduleSymbol)) == null ? void 0 : _a2.fileName : void 0;
                            const { moduleSpecifier } = (importSpecifierResolver || (importSpecifierResolver = ts_codefix_exports.createImportSpecifierResolver(sourceFile, program, host, preferences))).getModuleSpecifierForBestExportInfo([{
                                    exportKind: 0 /* Named */,
                                    moduleFileName: fileName,
                                    isFromPackageJson: false,
                                    moduleSymbol,
                                    symbol: firstAccessibleSymbol,
                                    targetFlags: skipAlias(firstAccessibleSymbol, typeChecker).flags
                                }], position, isValidTypeOnlyAliasUseSite(location)) || {};
                            if (moduleSpecifier) {
                                const origin = {
                                    kind: getNullableSymbolOriginInfoKind(6 /* SymbolMemberExport */),
                                    moduleSymbol,
                                    isDefaultExport: false,
                                    symbolName: firstAccessibleSymbol.name,
                                    exportName: firstAccessibleSymbol.name,
                                    fileName,
                                    moduleSpecifier
                                };
                                symbolToOriginInfoMap[index] = origin;
                            }
                        }
                    }
                    else if (preferences.includeCompletionsWithInsertText) {
                        addSymbolOriginInfo(symbol);
                        addSymbolSortInfo(symbol);
                        symbols.push(symbol);
                    }
                }
                else {
                    addSymbolOriginInfo(symbol);
                    addSymbolSortInfo(symbol);
                    symbols.push(symbol);
                }
                function addSymbolSortInfo(symbol2) {
                    if (isStaticProperty(symbol2)) {
                        symbolToSortTextMap[getSymbolId(symbol2)] = SortText.LocalDeclarationPriority;
                    }
                }
                function addSymbolOriginInfo(symbol2) {
                    if (preferences.includeCompletionsWithInsertText) {
                        if (insertAwait && addToSeen(seenPropertySymbols, getSymbolId(symbol2))) {
                            symbolToOriginInfoMap[symbols.length] = { kind: getNullableSymbolOriginInfoKind(8 /* Promise */) };
                        }
                        else if (insertQuestionDot) {
                            symbolToOriginInfoMap[symbols.length] = { kind: 16 /* Nullable */ };
                        }
                    }
                }
                function getNullableSymbolOriginInfoKind(kind) {
                    return insertQuestionDot ? kind | 16 /* Nullable */ : kind;
                }
            }