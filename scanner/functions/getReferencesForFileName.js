function getReferencesForFileName(fileName, program, sourceFiles, sourceFilesSet = new Set(sourceFiles.map((f) => f.fileName))) {
                        var _a2, _b;
                        const moduleSymbol = (_a2 = program.getSourceFile(fileName)) == null ? void 0 : _a2.symbol;
                        if (moduleSymbol) {
                            return ((_b = getReferencedSymbolsForModule(program, moduleSymbol, 
                            /*excludeImportTypeOfExportEquals*/
                            false, sourceFiles, sourceFilesSet)[0]) == null ? void 0 : _b.references) || emptyArray;
                        }
                        const fileIncludeReasons = program.getFileIncludeReasons();
                        const referencedFile = program.getSourceFile(fileName);
                        return referencedFile && fileIncludeReasons && getReferencesForNonModule(referencedFile, fileIncludeReasons, program) || emptyArray;
                    }