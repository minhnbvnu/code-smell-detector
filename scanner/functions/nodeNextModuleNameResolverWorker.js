function nodeNextModuleNameResolverWorker(features, moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode) {
            const containingDirectory = getDirectoryPath(containingFile);
            const esmMode = resolutionMode === 99 /* ESNext */ ? 32 /* EsmMode */ : 0;
            let extensions = compilerOptions.noDtsResolution ? 3 /* ImplementationFiles */ : 1 /* TypeScript */ | 2 /* JavaScript */ | 4 /* Declaration */;
            if (getResolveJsonModule(compilerOptions)) {
                extensions |= 8 /* Json */;
            }
            return nodeModuleNameResolverWorker(features | esmMode, moduleName, containingDirectory, compilerOptions, host, cache, extensions, 
            /*isConfigLookup*/
            false, redirectedReference);
        }