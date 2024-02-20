function loadModuleFromNearestNodeModulesDirectory(extensions, moduleName, directory, state, cache, redirectedReference) {
            return loadModuleFromNearestNodeModulesDirectoryWorker(extensions, moduleName, directory, state, 
            /*typesScopeOnly*/
            false, cache, redirectedReference);
        }