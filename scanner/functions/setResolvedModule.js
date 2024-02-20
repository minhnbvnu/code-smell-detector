function setResolvedModule(sourceFile, moduleNameText, resolvedModule, mode) {
            if (!sourceFile.resolvedModules) {
                sourceFile.resolvedModules = createModeAwareCache();
            }
            sourceFile.resolvedModules.set(moduleNameText, mode, resolvedModule);
        }