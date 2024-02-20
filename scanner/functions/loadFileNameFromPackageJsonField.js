function loadFileNameFromPackageJsonField(extensions, candidate, onlyRecordFailures, state) {
            if (extensions & 1 /* TypeScript */ && fileExtensionIsOneOf(candidate, supportedTSImplementationExtensions) || extensions & 4 /* Declaration */ && fileExtensionIsOneOf(candidate, supportedDeclarationExtensions)) {
                const result = tryFile(candidate, onlyRecordFailures, state);
                return result !== void 0 ? { path: candidate, ext: tryExtractTSExtension(candidate), resolvedUsingTsExtension: void 0 } : void 0;
            }
            if (state.isConfigLookup && extensions === 8 /* Json */ && fileExtensionIs(candidate, ".json" /* Json */)) {
                const result = tryFile(candidate, onlyRecordFailures, state);
                return result !== void 0 ? { path: candidate, ext: ".json" /* Json */, resolvedUsingTsExtension: void 0 } : void 0;
            }
            return loadModuleFromFileNoImplicitExtensions(extensions, candidate, onlyRecordFailures, state);
        }