function getSourceFileToImport(importedModuleSymbol, importLiteral, importingSourceFile, program, host, oldToNew) {
            var _a2;
            if (importedModuleSymbol) {
                const oldFileName = find(importedModuleSymbol.declarations, isSourceFile).fileName;
                const newFileName = oldToNew(oldFileName);
                return newFileName === void 0 ? { newFileName: oldFileName, updated: false } : { newFileName, updated: true };
            }
            else {
                const mode = getModeForUsageLocation(importingSourceFile, importLiteral);
                const resolved = host.resolveModuleNameLiterals || !host.resolveModuleNames ? (_a2 = importingSourceFile.resolvedModules) == null ? void 0 : _a2.get(importLiteral.text, mode) : host.getResolvedModuleWithFailedLookupLocationsFromCache && host.getResolvedModuleWithFailedLookupLocationsFromCache(importLiteral.text, importingSourceFile.fileName, mode);
                return getSourceFileToImportFromResolved(importLiteral, resolved, oldToNew, program.getSourceFiles());
            }
        }