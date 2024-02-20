function getReferencedFiles(program, sourceFile, getCanonicalFileName) {
                        let referencedFiles;
                        if (sourceFile.imports && sourceFile.imports.length > 0) {
                            const checker = program.getTypeChecker();
                            for (const importName of sourceFile.imports) {
                                const declarationSourceFilePaths = getReferencedFilesFromImportLiteral(checker, importName);
                                declarationSourceFilePaths == null ? void 0 : declarationSourceFilePaths.forEach(addReferencedFile);
                            }
                        }
                        const sourceFileDirectory = getDirectoryPath(sourceFile.resolvedPath);
                        if (sourceFile.referencedFiles && sourceFile.referencedFiles.length > 0) {
                            for (const referencedFile of sourceFile.referencedFiles) {
                                const referencedPath = getReferencedFileFromFileName(program, referencedFile.fileName, sourceFileDirectory, getCanonicalFileName);
                                addReferencedFile(referencedPath);
                            }
                        }
                        if (sourceFile.resolvedTypeReferenceDirectiveNames) {
                            sourceFile.resolvedTypeReferenceDirectiveNames.forEach(({ resolvedTypeReferenceDirective }) => {
                                if (!resolvedTypeReferenceDirective) {
                                    return;
                                }
                                const fileName = resolvedTypeReferenceDirective.resolvedFileName;
                                const typeFilePath = getReferencedFileFromFileName(program, fileName, sourceFileDirectory, getCanonicalFileName);
                                addReferencedFile(typeFilePath);
                            });
                        }
                        if (sourceFile.moduleAugmentations.length) {
                            const checker = program.getTypeChecker();
                            for (const moduleName of sourceFile.moduleAugmentations) {
                                if (!isStringLiteral(moduleName))
                                    continue;
                                const symbol = checker.getSymbolAtLocation(moduleName);
                                if (!symbol)
                                    continue;
                                addReferenceFromAmbientModule(symbol);
                            }
                        }
                        for (const ambientModule of program.getTypeChecker().getAmbientModules()) {
                            if (ambientModule.declarations && ambientModule.declarations.length > 1) {
                                addReferenceFromAmbientModule(ambientModule);
                            }
                        }
                        return referencedFiles;
                        function addReferenceFromAmbientModule(symbol) {
                            if (!symbol.declarations) {
                                return;
                            }
                            for (const declaration of symbol.declarations) {
                                const declarationSourceFile = getSourceFileOfNode(declaration);
                                if (declarationSourceFile && declarationSourceFile !== sourceFile) {
                                    addReferencedFile(declarationSourceFile.resolvedPath);
                                }
                            }
                        }
                        function addReferencedFile(referencedPath) {
                            (referencedFiles || (referencedFiles = /* @__PURE__ */ new Set())).add(referencedPath);
                        }
                    }