function getReferencedFilesFromImportedModuleSymbol(symbol) {
                        return mapDefined(symbol.declarations, (declaration) => {
                            var _a2;
                            return (_a2 = getSourceFileOfNode(declaration)) == null ? void 0 : _a2.resolvedPath;
                        });
                    }