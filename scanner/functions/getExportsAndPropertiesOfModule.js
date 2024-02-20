function getExportsAndPropertiesOfModule(moduleSymbol) {
                const exports = getExportsOfModuleAsArray(moduleSymbol);
                const exportEquals = resolveExternalModuleSymbol(moduleSymbol);
                if (exportEquals !== moduleSymbol) {
                    const type = getTypeOfSymbol(exportEquals);
                    if (shouldTreatPropertiesOfExternalModuleAsExports(type)) {
                        addRange(exports, getPropertiesOfType(type));
                    }
                }
                return exports;
            }