function updateExportedModules(state, sourceFile, exportedModulesFromDeclarationEmit) {
                        if (!state.exportedModulesMap)
                            return;
                        (state.oldExportedModulesMap || (state.oldExportedModulesMap = /* @__PURE__ */ new Map())).set(sourceFile.resolvedPath, state.exportedModulesMap.getValues(sourceFile.resolvedPath) || false);
                        const exportedModules = getExportedModules(exportedModulesFromDeclarationEmit);
                        if (exportedModules) {
                            state.exportedModulesMap.set(sourceFile.resolvedPath, exportedModules);
                        }
                        else {
                            state.exportedModulesMap.deleteKey(sourceFile.resolvedPath);
                        }
                    }