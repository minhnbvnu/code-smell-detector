function isProbablyGlobalType(type, sourceFile, checker) {
            const selfSymbol = checker.resolveName("self", 
            /*location*/
            void 0, 111551 /* Value */, 
            /*excludeGlobals*/
            false);
            if (selfSymbol && checker.getTypeOfSymbolAtLocation(selfSymbol, sourceFile) === type) {
                return true;
            }
            const globalSymbol = checker.resolveName("global", 
            /*location*/
            void 0, 111551 /* Value */, 
            /*excludeGlobals*/
            false);
            if (globalSymbol && checker.getTypeOfSymbolAtLocation(globalSymbol, sourceFile) === type) {
                return true;
            }
            const globalThisSymbol = checker.resolveName("globalThis", 
            /*location*/
            void 0, 111551 /* Value */, 
            /*excludeGlobals*/
            false);
            if (globalThisSymbol && checker.getTypeOfSymbolAtLocation(globalThisSymbol, sourceFile) === type) {
                return true;
            }
            return false;
        }