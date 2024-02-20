function tryFindAmbientModule(moduleName, withAugmentations) {
                if (isExternalModuleNameRelative(moduleName)) {
                    return void 0;
                }
                const symbol = getSymbol2(globals, '"' + moduleName + '"', 512 /* ValueModule */);
                return symbol && withAugmentations ? getMergedSymbol(symbol) : symbol;
            }