function updateImports(program, changeTracker, oldToNew, newToOld, host, getCanonicalFileName) {
            const allFiles = program.getSourceFiles();
            for (const sourceFile of allFiles) {
                const newFromOld = oldToNew(sourceFile.fileName);
                const newImportFromPath = newFromOld != null ? newFromOld : sourceFile.fileName;
                const newImportFromDirectory = getDirectoryPath(newImportFromPath);
                const oldFromNew = newToOld(sourceFile.fileName);
                const oldImportFromPath = oldFromNew || sourceFile.fileName;
                const oldImportFromDirectory = getDirectoryPath(oldImportFromPath);
                const importingSourceFileMoved = newFromOld !== void 0 || oldFromNew !== void 0;
                updateImportsWorker(sourceFile, changeTracker, (referenceText) => {
                    if (!pathIsRelative(referenceText))
                        return void 0;
                    const oldAbsolute = combinePathsSafe(oldImportFromDirectory, referenceText);
                    const newAbsolute = oldToNew(oldAbsolute);
                    return newAbsolute === void 0 ? void 0 : ensurePathIsNonModuleName(getRelativePathFromDirectory(newImportFromDirectory, newAbsolute, getCanonicalFileName));
                }, (importLiteral) => {
                    const importedModuleSymbol = program.getTypeChecker().getSymbolAtLocation(importLiteral);
                    if ((importedModuleSymbol == null ? void 0 : importedModuleSymbol.declarations) && importedModuleSymbol.declarations.some((d) => isAmbientModule(d)))
                        return void 0;
                    const toImport = oldFromNew !== void 0 ? getSourceFileToImportFromResolved(importLiteral, resolveModuleName(importLiteral.text, oldImportFromPath, program.getCompilerOptions(), host), oldToNew, allFiles) : getSourceFileToImport(importedModuleSymbol, importLiteral, sourceFile, program, host, oldToNew);
                    return toImport !== void 0 && (toImport.updated || importingSourceFileMoved && pathIsRelative(importLiteral.text)) ? ts_moduleSpecifiers_exports.updateModuleSpecifier(program.getCompilerOptions(), sourceFile, getCanonicalFileName(newImportFromPath), toImport.newFileName, createModuleSpecifierResolutionHost(program, host), importLiteral.text) : void 0;
                });
            }
        }