function getAmbientModuleCompletions(fragment, fragmentDirectory, checker) {
            const ambientModules = checker.getAmbientModules().map((sym) => stripQuotes(sym.name));
            const nonRelativeModuleNames = ambientModules.filter((moduleName) => startsWith(moduleName, fragment) && moduleName.indexOf("*") < 0);
            if (fragmentDirectory !== void 0) {
                const moduleNameWithSeparator = ensureTrailingDirectorySeparator(fragmentDirectory);
                return nonRelativeModuleNames.map((nonRelativeModuleName) => removePrefix(nonRelativeModuleName, moduleNameWithSeparator));
            }
            return nonRelativeModuleNames;
        }