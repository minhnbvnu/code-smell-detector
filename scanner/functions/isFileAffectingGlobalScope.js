function isFileAffectingGlobalScope(sourceFile) {
                        return containsGlobalScopeAugmentation(sourceFile) || !isExternalOrCommonJsModule(sourceFile) && !isJsonSourceFile(sourceFile) && !containsOnlyAmbientModules(sourceFile);
                    }