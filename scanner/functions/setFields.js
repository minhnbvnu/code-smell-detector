function setFields(sourceFile2) {
                            sourceFile2.text = sourceText;
                            sourceFile2.bindDiagnostics = [];
                            sourceFile2.bindSuggestionDiagnostics = void 0;
                            sourceFile2.languageVersion = languageVersion2;
                            sourceFile2.fileName = fileName2;
                            sourceFile2.languageVariant = getLanguageVariant(scriptKind2);
                            sourceFile2.isDeclarationFile = isDeclarationFile;
                            sourceFile2.scriptKind = scriptKind2;
                            setExternalModuleIndicator2(sourceFile2);
                            sourceFile2.setExternalModuleIndicator = setExternalModuleIndicator2;
                        }