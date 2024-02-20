function getReferencedSymbolsForModuleIfDeclaredBySourceFile(symbol, program, sourceFiles, cancellationToken, options, sourceFilesSet) {
                        const moduleSourceFile = symbol.flags & 1536 /* Module */ && symbol.declarations && find(symbol.declarations, isSourceFile);
                        if (!moduleSourceFile)
                            return void 0;
                        const exportEquals = symbol.exports.get("export=" /* ExportEquals */);
                        const moduleReferences = getReferencedSymbolsForModule(program, symbol, !!exportEquals, sourceFiles, sourceFilesSet);
                        if (!exportEquals || !sourceFilesSet.has(moduleSourceFile.fileName))
                            return moduleReferences;
                        const checker = program.getTypeChecker();
                        symbol = skipAlias(exportEquals, checker);
                        return mergeReferences(program, moduleReferences, getReferencedSymbolsForSymbol(symbol, 
                        /*node*/
                        void 0, sourceFiles, sourceFilesSet, checker, cancellationToken, options));
                    }