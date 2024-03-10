function getSpecifierForModuleSymbol(symbol, context, overrideImportMode) {
                    var _a2;
                    let file = getDeclarationOfKind(symbol, 308 /* SourceFile */);
                    if (!file) {
                        const equivalentFileSymbol = firstDefined(symbol.declarations, (d) => getFileSymbolIfFileSymbolExportEqualsContainer(d, symbol));
                        if (equivalentFileSymbol) {
                            file = getDeclarationOfKind(equivalentFileSymbol, 308 /* SourceFile */);
                        }
                    }
                    if (file && file.moduleName !== void 0) {
                        return file.moduleName;
                    }
                    if (!file) {
                        if (context.tracker.trackReferencedAmbientModule) {
                            const ambientDecls = filter(symbol.declarations, isAmbientModule);
                            if (length(ambientDecls)) {
                                for (const decl of ambientDecls) {
                                    context.tracker.trackReferencedAmbientModule(decl, symbol);
                                }
                            }
                        }
                        if (ambientModuleSymbolRegex.test(symbol.escapedName)) {
                            return symbol.escapedName.substring(1, symbol.escapedName.length - 1);
                        }
                    }
                    if (!context.enclosingDeclaration || !context.tracker.moduleResolverHost) {
                        if (ambientModuleSymbolRegex.test(symbol.escapedName)) {
                            return symbol.escapedName.substring(1, symbol.escapedName.length - 1);
                        }
                        return getSourceFileOfNode(getNonAugmentationDeclaration(symbol)).fileName;
                    }
                    const contextFile = getSourceFileOfNode(getOriginalNode(context.enclosingDeclaration));
                    const resolutionMode = overrideImportMode || (contextFile == null ? void 0 : contextFile.impliedNodeFormat);
                    const cacheKey = createModeAwareCacheKey(contextFile.path, resolutionMode);
                    const links = getSymbolLinks(symbol);
                    let specifier = links.specifierCache && links.specifierCache.get(cacheKey);
                    if (!specifier) {
                        const isBundle2 = !!outFile(compilerOptions);
                        const { moduleResolverHost } = context.tracker;
                        const specifierCompilerOptions = isBundle2 ? { ...compilerOptions, baseUrl: moduleResolverHost.getCommonSourceDirectory() } : compilerOptions;
                        specifier = first(getModuleSpecifiers(symbol, checker, specifierCompilerOptions, contextFile, moduleResolverHost, {
                            importModuleSpecifierPreference: isBundle2 ? "non-relative" : "project-relative",
                            importModuleSpecifierEnding: isBundle2 ? "minimal" : resolutionMode === 99 /* ESNext */ ? "js" : void 0
                        }, { overrideImportMode }));
                        (_a2 = links.specifierCache) != null ? _a2 : links.specifierCache = /* @__PURE__ */ new Map();
                        links.specifierCache.set(cacheKey, specifier);
                    }
                    return specifier;
                }