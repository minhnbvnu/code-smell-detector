function getReferencedSymbolsForNode(position, node, program, sourceFiles, cancellationToken, options = {}, sourceFilesSet = new Set(sourceFiles.map((f) => f.fileName))) {
                        var _a2, _b, _c;
                        node = getAdjustedNode(node, options);
                        if (isSourceFile(node)) {
                            const resolvedRef = ts_GoToDefinition_exports.getReferenceAtPosition(node, position, program);
                            if (!(resolvedRef == null ? void 0 : resolvedRef.file)) {
                                return void 0;
                            }
                            const moduleSymbol = program.getTypeChecker().getMergedSymbol(resolvedRef.file.symbol);
                            if (moduleSymbol) {
                                return getReferencedSymbolsForModule(program, moduleSymbol, 
                                /*excludeImportTypeOfExportEquals*/
                                false, sourceFiles, sourceFilesSet);
                            }
                            const fileIncludeReasons = program.getFileIncludeReasons();
                            if (!fileIncludeReasons) {
                                return void 0;
                            }
                            return [{
                                    definition: { type: 5 /* TripleSlashReference */, reference: resolvedRef.reference, file: node },
                                    references: getReferencesForNonModule(resolvedRef.file, fileIncludeReasons, program) || emptyArray
                                }];
                        }
                        if (!options.implementations) {
                            const special = getReferencedSymbolsSpecial(node, sourceFiles, cancellationToken);
                            if (special) {
                                return special;
                            }
                        }
                        const checker = program.getTypeChecker();
                        const symbol = checker.getSymbolAtLocation(isConstructorDeclaration(node) && node.parent.name || node);
                        if (!symbol) {
                            if (!options.implementations && isStringLiteralLike(node)) {
                                if (isModuleSpecifierLike(node)) {
                                    const fileIncludeReasons = program.getFileIncludeReasons();
                                    const referencedFileName = (_c = (_b = (_a2 = node.getSourceFile().resolvedModules) == null ? void 0 : _a2.get(node.text, getModeForUsageLocation(node.getSourceFile(), node))) == null ? void 0 : _b.resolvedModule) == null ? void 0 : _c.resolvedFileName;
                                    const referencedFile = referencedFileName ? program.getSourceFile(referencedFileName) : void 0;
                                    if (referencedFile) {
                                        return [{ definition: { type: 4 /* String */, node }, references: getReferencesForNonModule(referencedFile, fileIncludeReasons, program) || emptyArray }];
                                    }
                                }
                                return getReferencesForStringLiteral(node, sourceFiles, checker, cancellationToken);
                            }
                            return void 0;
                        }
                        if (symbol.escapedName === "export=" /* ExportEquals */) {
                            return getReferencedSymbolsForModule(program, symbol.parent, 
                            /*excludeImportTypeOfExportEquals*/
                            false, sourceFiles, sourceFilesSet);
                        }
                        const moduleReferences = getReferencedSymbolsForModuleIfDeclaredBySourceFile(symbol, program, sourceFiles, cancellationToken, options, sourceFilesSet);
                        if (moduleReferences && !(symbol.flags & 33554432 /* Transient */)) {
                            return moduleReferences;
                        }
                        const aliasedSymbol = getMergedAliasedSymbolOfNamespaceExportDeclaration(node, symbol, checker);
                        const moduleReferencesOfExportTarget = aliasedSymbol && getReferencedSymbolsForModuleIfDeclaredBySourceFile(aliasedSymbol, program, sourceFiles, cancellationToken, options, sourceFilesSet);
                        const references = getReferencedSymbolsForSymbol(symbol, node, sourceFiles, sourceFilesSet, checker, cancellationToken, options);
                        return mergeReferences(program, moduleReferences, references, moduleReferencesOfExportTarget);
                    }