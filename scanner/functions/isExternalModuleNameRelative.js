function isExternalModuleNameRelative(moduleName) {
            return pathIsRelative(moduleName) || isRootedDiskPath(moduleName);
        }