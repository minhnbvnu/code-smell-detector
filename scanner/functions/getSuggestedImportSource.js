function getSuggestedImportSource(tsExtension) {
                    const importSourceWithoutExtension = removeExtension(moduleReference, tsExtension);
                    if (emitModuleKindIsNonNodeESM(moduleKind) || mode === 99 /* ESNext */) {
                        const preferTs = isDeclarationFileName(moduleReference) && shouldAllowImportingTsExtension(compilerOptions);
                        const ext = tsExtension === ".mts" /* Mts */ || tsExtension === ".d.mts" /* Dmts */ ? preferTs ? ".mts" : ".mjs" : tsExtension === ".cts" /* Cts */ || tsExtension === ".d.mts" /* Dmts */ ? preferTs ? ".cts" : ".cjs" : preferTs ? ".ts" : ".js";
                        return importSourceWithoutExtension + ext;
                    }
                    return importSourceWithoutExtension;
                }