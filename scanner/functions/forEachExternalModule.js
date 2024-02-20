function forEachExternalModule(checker, allSourceFiles, excludePatterns, cb) {
            var _a2;
            const isExcluded = excludePatterns && ((fileName) => excludePatterns.some((p) => p.test(fileName)));
            for (const ambient of checker.getAmbientModules()) {
                if (!stringContains(ambient.name, "*") && !(excludePatterns && ((_a2 = ambient.declarations) == null ? void 0 : _a2.every((d) => isExcluded(d.getSourceFile().fileName))))) {
                    cb(ambient, 
                    /*sourceFile*/
                    void 0);
                }
            }
            for (const sourceFile of allSourceFiles) {
                if (isExternalOrCommonJsModule(sourceFile) && !(isExcluded == null ? void 0 : isExcluded(sourceFile.fileName))) {
                    cb(checker.getMergedSymbol(sourceFile.symbol), sourceFile);
                }
            }
        }