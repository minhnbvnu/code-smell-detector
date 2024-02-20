function getIndirectUsers() {
                if (isAvailableThroughGlobal) {
                    return sourceFiles;
                }
                if (exportingModuleSymbol.declarations) {
                    for (const decl of exportingModuleSymbol.declarations) {
                        if (isExternalModuleAugmentation(decl) && sourceFilesSet.has(decl.getSourceFile().fileName)) {
                            addIndirectUser(decl);
                        }
                    }
                }
                return indirectUserDeclarations.map(getSourceFileOfNode);
            }