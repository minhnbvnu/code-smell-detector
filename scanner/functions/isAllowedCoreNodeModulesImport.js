function isAllowedCoreNodeModulesImport(moduleSpecifier) {
                if (isSourceFileJS(fromFile) && ts_JsTyping_exports.nodeCoreModules.has(moduleSpecifier)) {
                    if (usesNodeCoreModules === void 0) {
                        usesNodeCoreModules = consumesNodeCoreModules(fromFile);
                    }
                    if (usesNodeCoreModules) {
                        return true;
                    }
                }
                return false;
            }