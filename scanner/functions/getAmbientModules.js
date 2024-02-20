function getAmbientModules() {
                if (!ambientModulesCache) {
                    ambientModulesCache = [];
                    globals.forEach((global2, sym) => {
                        if (ambientModuleSymbolRegex.test(sym)) {
                            ambientModulesCache.push(global2);
                        }
                    });
                }
                return ambientModulesCache;
            }