function collectAutoImports() {
                var _a2, _b;
                if (!shouldOfferImportCompletions())
                    return;
                Debug.assert(!(detailsEntryId == null ? void 0 : detailsEntryId.data), "Should not run 'collectAutoImports' when faster path is available via `data`");
                if (detailsEntryId && !detailsEntryId.source) {
                    return;
                }
                flags |= 1 /* MayIncludeAutoImports */;
                const isAfterTypeOnlyImportSpecifierModifier = previousToken === contextToken && importStatementCompletion;
                const lowerCaseTokenText = isAfterTypeOnlyImportSpecifierModifier ? "" : previousToken && isIdentifier(previousToken) ? previousToken.text.toLowerCase() : "";
                const moduleSpecifierCache = (_a2 = host.getModuleSpecifierCache) == null ? void 0 : _a2.call(host);
                const exportInfo = getExportInfoMap(sourceFile, host, program, preferences, cancellationToken);
                const packageJsonAutoImportProvider = (_b = host.getPackageJsonAutoImportProvider) == null ? void 0 : _b.call(host);
                const packageJsonFilter = detailsEntryId ? void 0 : createPackageJsonImportFilter(sourceFile, preferences, host);
                resolvingModuleSpecifiers("collectAutoImports", host, importSpecifierResolver || (importSpecifierResolver = ts_codefix_exports.createImportSpecifierResolver(sourceFile, program, host, preferences)), program, position, preferences, !!importStatementCompletion, isValidTypeOnlyAliasUseSite(location), (context) => {
                    exportInfo.search(sourceFile.path, 
                    /*preferCapitalized*/
                    isRightOfOpenTag, (symbolName2, targetFlags) => {
                        if (!isIdentifierText(symbolName2, getEmitScriptTarget(host.getCompilationSettings())))
                            return false;
                        if (!detailsEntryId && isStringANonContextualKeyword(symbolName2))
                            return false;
                        if (!isTypeOnlyLocation && !importStatementCompletion && !(targetFlags & 111551 /* Value */))
                            return false;
                        if (isTypeOnlyLocation && !(targetFlags & (1536 /* Module */ | 788968 /* Type */)))
                            return false;
                        const firstChar = symbolName2.charCodeAt(0);
                        if (isRightOfOpenTag && (firstChar < 65 /* A */ || firstChar > 90 /* Z */))
                            return false;
                        if (detailsEntryId)
                            return true;
                        return charactersFuzzyMatchInString(symbolName2, lowerCaseTokenText);
                    }, (info, symbolName2, isFromAmbientModule, exportMapKey) => {
                        if (detailsEntryId && !some(info, (i) => detailsEntryId.source === stripQuotes(i.moduleSymbol.name))) {
                            return;
                        }
                        info = filter(info, isImportableExportInfo);
                        if (!info.length) {
                            return;
                        }
                        const result = context.tryResolve(info, isFromAmbientModule) || {};
                        if (result === "failed")
                            return;
                        let exportInfo2 = info[0], moduleSpecifier;
                        if (result !== "skipped") {
                            ({ exportInfo: exportInfo2 = info[0], moduleSpecifier } = result);
                        }
                        const isDefaultExport = exportInfo2.exportKind === 1 /* Default */;
                        const symbol = isDefaultExport && getLocalSymbolForExportDefault(exportInfo2.symbol) || exportInfo2.symbol;
                        pushAutoImportSymbol(symbol, {
                            kind: moduleSpecifier ? 32 /* ResolvedExport */ : 4 /* Export */,
                            moduleSpecifier,
                            symbolName: symbolName2,
                            exportMapKey,
                            exportName: exportInfo2.exportKind === 2 /* ExportEquals */ ? "export=" /* ExportEquals */ : exportInfo2.symbol.name,
                            fileName: exportInfo2.moduleFileName,
                            isDefaultExport,
                            moduleSymbol: exportInfo2.moduleSymbol,
                            isFromPackageJson: exportInfo2.isFromPackageJson
                        });
                    });
                    hasUnresolvedAutoImports = context.skippedAny();
                    flags |= context.resolvedAny() ? 8 /* ResolvedModuleSpecifiers */ : 0;
                    flags |= context.resolvedBeyondLimit() ? 16 /* ResolvedModuleSpecifiersBeyondLimit */ : 0;
                });
                function isImportableExportInfo(info) {
                    const moduleFile = tryCast(info.moduleSymbol.valueDeclaration, isSourceFile);
                    if (!moduleFile) {
                        const moduleName = stripQuotes(info.moduleSymbol.name);
                        if (ts_JsTyping_exports.nodeCoreModules.has(moduleName) && startsWith(moduleName, "node:") !== shouldUseUriStyleNodeCoreModules(sourceFile, program)) {
                            return false;
                        }
                        return packageJsonFilter ? packageJsonFilter.allowsImportingAmbientModule(info.moduleSymbol, getModuleSpecifierResolutionHost(info.isFromPackageJson)) : true;
                    }
                    return isImportableFile(info.isFromPackageJson ? packageJsonAutoImportProvider : program, sourceFile, moduleFile, preferences, packageJsonFilter, getModuleSpecifierResolutionHost(info.isFromPackageJson), moduleSpecifierCache);
                }
            }