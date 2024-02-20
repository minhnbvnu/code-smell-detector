function isExportingScope(enclosingDeclaration2) {
                        return isSourceFile(enclosingDeclaration2) && (isExternalOrCommonJsModule(enclosingDeclaration2) || isJsonSourceFile(enclosingDeclaration2)) || isAmbientModule(enclosingDeclaration2) && !isGlobalScopeAugmentation(enclosingDeclaration2);
                    }