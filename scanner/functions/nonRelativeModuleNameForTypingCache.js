function nonRelativeModuleNameForTypingCache(moduleName) {
            return nodeCoreModules.has(moduleName) ? "node" : moduleName;
        }