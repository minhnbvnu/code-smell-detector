function trackExternalModuleSymbolOfImportTypeNode(symbol) {
                if (!isBundledEmit) {
                    (exportedModulesFromDeclarationEmit || (exportedModulesFromDeclarationEmit = [])).push(symbol);
                }
            }