function loadModuleFromImmediateNodeModulesDirectory(extensions, moduleName, directory, state, typesScopeOnly, cache, redirectedReference) {
            const nodeModulesFolder = combinePaths(directory, "node_modules");
            const nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
            if (!nodeModulesFolderExists && state.traceEnabled) {
                trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesFolder);
            }
            if (!typesScopeOnly) {
                const packageResult = loadModuleFromSpecificNodeModulesDirectory(extensions, moduleName, nodeModulesFolder, nodeModulesFolderExists, state, cache, redirectedReference);
                if (packageResult) {
                    return packageResult;
                }
            }
            if (extensions & 4 /* Declaration */) {
                const nodeModulesAtTypes2 = combinePaths(nodeModulesFolder, "@types");
                let nodeModulesAtTypesExists = nodeModulesFolderExists;
                if (nodeModulesFolderExists && !directoryProbablyExists(nodeModulesAtTypes2, state.host)) {
                    if (state.traceEnabled) {
                        trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesAtTypes2);
                    }
                    nodeModulesAtTypesExists = false;
                }
                return loadModuleFromSpecificNodeModulesDirectory(4 /* Declaration */, mangleScopedPackageNameWithTrace(moduleName, state), nodeModulesAtTypes2, nodeModulesAtTypesExists, state, cache, redirectedReference);
            }
        }