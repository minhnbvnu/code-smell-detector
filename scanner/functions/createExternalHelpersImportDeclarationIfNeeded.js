function createExternalHelpersImportDeclarationIfNeeded(nodeFactory, helperFactory, sourceFile, compilerOptions, hasExportStarsToExportValues, hasImportStar, hasImportDefault) {
            if (compilerOptions.importHelpers && isEffectiveExternalModule(sourceFile, compilerOptions)) {
                let namedBindings;
                const moduleKind = getEmitModuleKind(compilerOptions);
                if (moduleKind >= 5 /* ES2015 */ && moduleKind <= 99 /* ESNext */ || sourceFile.impliedNodeFormat === 99 /* ESNext */) {
                    const helpers = getEmitHelpers(sourceFile);
                    if (helpers) {
                        const helperNames = [];
                        for (const helper of helpers) {
                            if (!helper.scoped) {
                                const importName = helper.importName;
                                if (importName) {
                                    pushIfUnique(helperNames, importName);
                                }
                            }
                        }
                        if (some(helperNames)) {
                            helperNames.sort(compareStringsCaseSensitive);
                            namedBindings = nodeFactory.createNamedImports(map(helperNames, (name) => isFileLevelUniqueName(sourceFile, name) ? nodeFactory.createImportSpecifier(
                            /*isTypeOnly*/
                            false, 
                            /*propertyName*/
                            void 0, nodeFactory.createIdentifier(name)) : nodeFactory.createImportSpecifier(
                            /*isTypeOnly*/
                            false, nodeFactory.createIdentifier(name), helperFactory.getUnscopedHelperName(name))));
                            const parseNode = getOriginalNode(sourceFile, isSourceFile);
                            const emitNode = getOrCreateEmitNode(parseNode);
                            emitNode.externalHelpers = true;
                        }
                    }
                }
                else {
                    const externalHelpersModuleName = getOrCreateExternalHelpersModuleNameIfNeeded(nodeFactory, sourceFile, compilerOptions, hasExportStarsToExportValues, hasImportStar || hasImportDefault);
                    if (externalHelpersModuleName) {
                        namedBindings = nodeFactory.createNamespaceImport(externalHelpersModuleName);
                    }
                }
                if (namedBindings) {
                    const externalHelpersImportDeclaration = nodeFactory.createImportDeclaration(
                    /*modifiers*/
                    void 0, nodeFactory.createImportClause(
                    /*isTypeOnly*/
                    false, 
                    /*name*/
                    void 0, namedBindings), nodeFactory.createStringLiteral(externalHelpersModuleNameText), 
                    /*assertClause*/
                    void 0);
                    addInternalEmitFlags(externalHelpersImportDeclaration, 2 /* NeverApplyImportHelper */);
                    return externalHelpersImportDeclaration;
                }
            }
        }