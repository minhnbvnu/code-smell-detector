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