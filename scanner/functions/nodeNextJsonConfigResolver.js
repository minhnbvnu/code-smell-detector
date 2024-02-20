function nodeNextJsonConfigResolver(moduleName, containingFile, host) {
            return nodeModuleNameResolverWorker(30 /* NodeNextDefault */, moduleName, getDirectoryPath(containingFile), { moduleResolution: 99 /* NodeNext */ }, host, 
            /*cache*/
            void 0, 8 /* Json */, 
            /*isConfigLookup*/
            true, 
            /*redirectedReference*/
            void 0);
        }