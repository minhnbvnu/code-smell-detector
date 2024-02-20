function nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, isConfigLookup) {
            let extensions;
            if (isConfigLookup) {
                extensions = 8 /* Json */;
            }
            else if (compilerOptions.noDtsResolution) {
                extensions = 3 /* ImplementationFiles */;
                if (getResolveJsonModule(compilerOptions))
                    extensions |= 8 /* Json */;
            }
            else {
                extensions = getResolveJsonModule(compilerOptions) ? 1 /* TypeScript */ | 2 /* JavaScript */ | 4 /* Declaration */ | 8 /* Json */ : 1 /* TypeScript */ | 2 /* JavaScript */ | 4 /* Declaration */;
            }
            return nodeModuleNameResolverWorker(0 /* None */, moduleName, getDirectoryPath(containingFile), compilerOptions, host, cache, extensions, !!isConfigLookup, redirectedReference);
        }