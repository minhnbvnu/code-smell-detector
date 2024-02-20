function bundlerModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference) {
            const containingDirectory = getDirectoryPath(containingFile);
            let extensions = compilerOptions.noDtsResolution ? 3 /* ImplementationFiles */ : 1 /* TypeScript */ | 2 /* JavaScript */ | 4 /* Declaration */;
            if (getResolveJsonModule(compilerOptions)) {
                extensions |= 8 /* Json */;
            }
            return nodeModuleNameResolverWorker(getNodeResolutionFeatures(compilerOptions), moduleName, containingDirectory, compilerOptions, host, cache, extensions, 
            /*isConfigLookup*/
            false, redirectedReference);
        }