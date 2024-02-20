function forEachExportAndPropertyOfModule(moduleSymbol, cb) {
                const exports = getExportsOfModule(moduleSymbol);
                exports.forEach((symbol, key) => {
                    if (!isReservedMemberName(key)) {
                        cb(symbol, key);
                    }
                });
                const exportEquals = resolveExternalModuleSymbol(moduleSymbol);
                if (exportEquals !== moduleSymbol) {
                    const type = getTypeOfSymbol(exportEquals);
                    if (shouldTreatPropertiesOfExternalModuleAsExports(type)) {
                        forEachPropertyOfType(type, (symbol, escapedName) => {
                            cb(symbol, escapedName);
                        });
                    }
                }
            }