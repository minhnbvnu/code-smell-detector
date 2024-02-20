function getExportedModules(exportedModulesFromDeclarationEmit) {
                        let exportedModules;
                        exportedModulesFromDeclarationEmit == null ? void 0 : exportedModulesFromDeclarationEmit.forEach((symbol) => getReferencedFilesFromImportedModuleSymbol(symbol).forEach((path) => (exportedModules != null ? exportedModules : exportedModules = /* @__PURE__ */ new Set()).add(path)));
                        return exportedModules;
                    }