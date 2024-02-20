function forEachExternalModuleToImportFrom(program, host, preferences, useAutoImportProvider, cb) {
            var _a2, _b;
            const useCaseSensitiveFileNames = hostUsesCaseSensitiveFileNames(host);
            const excludePatterns = preferences.autoImportFileExcludePatterns && mapDefined(preferences.autoImportFileExcludePatterns, (spec) => {
                const pattern = getPatternFromSpec(spec, "", "exclude");
                return pattern ? getRegexFromPattern(pattern, useCaseSensitiveFileNames) : void 0;
            });
            forEachExternalModule(program.getTypeChecker(), program.getSourceFiles(), excludePatterns, (module2, file) => cb(module2, file, program, 
            /*isFromPackageJson*/
            false));
            const autoImportProvider = useAutoImportProvider && ((_a2 = host.getPackageJsonAutoImportProvider) == null ? void 0 : _a2.call(host));
            if (autoImportProvider) {
                const start = timestamp();
                const checker = program.getTypeChecker();
                forEachExternalModule(autoImportProvider.getTypeChecker(), autoImportProvider.getSourceFiles(), excludePatterns, (module2, file) => {
                    if (file && !program.getSourceFile(file.fileName) || !file && !checker.resolveName(module2.name, 
                    /*location*/
                    void 0, 1536 /* Module */, 
                    /*excludeGlobals*/
                    false)) {
                        cb(module2, file, autoImportProvider, 
                        /*isFromPackageJson*/
                        true);
                    }
                });
                (_b = host.log) == null ? void 0 : _b.call(host, `forEachExternalModuleToImportFrom autoImportProvider: ${timestamp() - start}`);
            }
        }