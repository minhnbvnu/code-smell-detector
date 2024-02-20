function nodeNextModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode) {
            return nodeNextModuleNameResolverWorker(30 /* NodeNextDefault */, moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode);
        }