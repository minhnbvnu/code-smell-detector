function getNonAugmentationDeclaration(symbol) {
            var _a2;
            return (_a2 = symbol.declarations) == null ? void 0 : _a2.find((d) => !isExternalModuleAugmentation(d) && !(isModuleDeclaration(d) && isGlobalScopeAugmentation(d)));
        }