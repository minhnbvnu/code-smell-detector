function getExtensionOptions(compilerOptions, referenceKind, importingSourceFile, typeChecker, preferences, resolutionMode) {
            return {
                extensionsToSearch: flatten(getSupportedExtensionsForModuleResolution(compilerOptions, typeChecker)),
                referenceKind,
                importingSourceFile,
                endingPreference: preferences == null ? void 0 : preferences.importModuleSpecifierEnding,
                resolutionMode
            };
        }