function getImportersForExport(sourceFiles, sourceFilesSet, allDirectImports, { exportingModuleSymbol, exportKind }, checker, cancellationToken) {
            const markSeenDirectImport = nodeSeenTracker();
            const markSeenIndirectUser = nodeSeenTracker();
            const directImports = [];
            const isAvailableThroughGlobal = !!exportingModuleSymbol.globalExports;
            const indirectUserDeclarations = isAvailableThroughGlobal ? void 0 : [];
            handleDirectImports(exportingModuleSymbol);
            return { directImports, indirectUsers: getIndirectUsers() };
            function getIndirectUsers() {
                if (isAvailableThroughGlobal) {
                    return sourceFiles;
                }
                if (exportingModuleSymbol.declarations) {
                    for (const decl of exportingModuleSymbol.declarations) {
                        if (isExternalModuleAugmentation(decl) && sourceFilesSet.has(decl.getSourceFile().fileName)) {
                            addIndirectUser(decl);
                        }
                    }
                }
                return indirectUserDeclarations.map(getSourceFileOfNode);
            }
            function handleDirectImports(exportingModuleSymbol2) {
                const theseDirectImports = getDirectImports(exportingModuleSymbol2);
                if (theseDirectImports) {
                    for (const direct of theseDirectImports) {
                        if (!markSeenDirectImport(direct)) {
                            continue;
                        }
                        if (cancellationToken)
                            cancellationToken.throwIfCancellationRequested();
                        switch (direct.kind) {
                            case 210 /* CallExpression */:
                                if (isImportCall(direct)) {
                                    handleImportCall(direct);
                                    break;
                                }
                                if (!isAvailableThroughGlobal) {
                                    const parent2 = direct.parent;
                                    if (exportKind === 2 /* ExportEquals */ && parent2.kind === 257 /* VariableDeclaration */) {
                                        const { name } = parent2;
                                        if (name.kind === 79 /* Identifier */) {
                                            directImports.push(name);
                                            break;
                                        }
                                    }
                                }
                                break;
                            case 79 /* Identifier */:
                                break;
                            case 268 /* ImportEqualsDeclaration */:
                                handleNamespaceImport(direct, direct.name, hasSyntacticModifier(direct, 1 /* Export */), 
                                /*alreadyAddedDirect*/
                                false);
                                break;
                            case 269 /* ImportDeclaration */:
                                directImports.push(direct);
                                const namedBindings = direct.importClause && direct.importClause.namedBindings;
                                if (namedBindings && namedBindings.kind === 271 /* NamespaceImport */) {
                                    handleNamespaceImport(direct, namedBindings.name, 
                                    /*isReExport*/
                                    false, 
                                    /*alreadyAddedDirect*/
                                    true);
                                }
                                else if (!isAvailableThroughGlobal && isDefaultImport(direct)) {
                                    addIndirectUser(getSourceFileLikeForImportDeclaration(direct));
                                }
                                break;
                            case 275 /* ExportDeclaration */:
                                if (!direct.exportClause) {
                                    handleDirectImports(getContainingModuleSymbol(direct, checker));
                                }
                                else if (direct.exportClause.kind === 277 /* NamespaceExport */) {
                                    addIndirectUser(getSourceFileLikeForImportDeclaration(direct), 
                                    /** addTransitiveDependencies */
                                    true);
                                }
                                else {
                                    directImports.push(direct);
                                }
                                break;
                            case 202 /* ImportType */:
                                if (!isAvailableThroughGlobal && direct.isTypeOf && !direct.qualifier && isExported2(direct)) {
                                    addIndirectUser(direct.getSourceFile(), 
                                    /** addTransitiveDependencies */
                                    true);
                                }
                                directImports.push(direct);
                                break;
                            default:
                                Debug.failBadSyntaxKind(direct, "Unexpected import kind.");
                        }
                    }
                }
            }
            function handleImportCall(importCall) {
                const top = findAncestor(importCall, isAmbientModuleDeclaration) || importCall.getSourceFile();
                addIndirectUser(top, 
                /** addTransitiveDependencies */
                !!isExported2(importCall, 
                /** stopAtAmbientModule */
                true));
            }
            function isExported2(node, stopAtAmbientModule = false) {
                return findAncestor(node, (node2) => {
                    if (stopAtAmbientModule && isAmbientModuleDeclaration(node2))
                        return "quit";
                    return canHaveModifiers(node2) && some(node2.modifiers, isExportModifier);
                });
            }
            function handleNamespaceImport(importDeclaration, name, isReExport, alreadyAddedDirect) {
                if (exportKind === 2 /* ExportEquals */) {
                    if (!alreadyAddedDirect)
                        directImports.push(importDeclaration);
                }
                else if (!isAvailableThroughGlobal) {
                    const sourceFileLike = getSourceFileLikeForImportDeclaration(importDeclaration);
                    Debug.assert(sourceFileLike.kind === 308 /* SourceFile */ || sourceFileLike.kind === 264 /* ModuleDeclaration */);
                    if (isReExport || findNamespaceReExports(sourceFileLike, name, checker)) {
                        addIndirectUser(sourceFileLike, 
                        /** addTransitiveDependencies */
                        true);
                    }
                    else {
                        addIndirectUser(sourceFileLike);
                    }
                }
            }
            function addIndirectUser(sourceFileLike, addTransitiveDependencies = false) {
                Debug.assert(!isAvailableThroughGlobal);
                const isNew = markSeenIndirectUser(sourceFileLike);
                if (!isNew)
                    return;
                indirectUserDeclarations.push(sourceFileLike);
                if (!addTransitiveDependencies)
                    return;
                const moduleSymbol = checker.getMergedSymbol(sourceFileLike.symbol);
                if (!moduleSymbol)
                    return;
                Debug.assert(!!(moduleSymbol.flags & 1536 /* Module */));
                const directImports2 = getDirectImports(moduleSymbol);
                if (directImports2) {
                    for (const directImport of directImports2) {
                        if (!isImportTypeNode(directImport)) {
                            addIndirectUser(getSourceFileLikeForImportDeclaration(directImport), 
                            /** addTransitiveDependencies */
                            true);
                        }
                    }
                }
            }
            function getDirectImports(moduleSymbol) {
                return allDirectImports.get(getSymbolId(moduleSymbol).toString());
            }
        }