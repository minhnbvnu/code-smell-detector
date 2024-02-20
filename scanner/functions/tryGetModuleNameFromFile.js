function tryGetModuleNameFromFile(factory2, file, host, options) {
            if (!file) {
                return void 0;
            }
            if (file.moduleName) {
                return factory2.createStringLiteral(file.moduleName);
            }
            if (!file.isDeclarationFile && outFile(options)) {
                return factory2.createStringLiteral(getExternalModuleNameFromPath(host, file.fileName));
            }
            return void 0;
        }