function tryResolveJSModuleWorker(moduleName, initialDir, host) {
            return nodeModuleNameResolverWorker(0 /* None */, moduleName, initialDir, { moduleResolution: 2 /* Node10 */, allowJs: true }, host, 
            /*cache*/
            void 0, 2 /* JavaScript */, 
            /*isConfigLookup*/
            false, 
            /*redirectedReferences*/
            void 0);
        }