function getResolvedModule(sourceFile, moduleNameText, mode) {
            var _a2, _b;
            return (_b = (_a2 = sourceFile == null ? void 0 : sourceFile.resolvedModules) == null ? void 0 : _a2.get(moduleNameText, mode)) == null ? void 0 : _b.resolvedModule;
        }