function isExportEqualsModule(moduleSpecifier, checker) {
            const externalModule = checker.resolveExternalModuleName(moduleSpecifier);
            if (!externalModule)
                return false;
            const exportEquals = checker.resolveExternalModuleSymbol(externalModule);
            return externalModule !== exportEquals;
        }