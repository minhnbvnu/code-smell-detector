function makeIdentifierFromModuleName(moduleName) {
            return getBaseFileName(moduleName).replace(/^(\d)/, "_$1").replace(/\W/g, "_");
        }