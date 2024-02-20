function addReferenceFromAmbientModule(symbol) {
                            if (!symbol.declarations) {
                                return;
                            }
                            for (const declaration of symbol.declarations) {
                                const declarationSourceFile = getSourceFileOfNode(declaration);
                                if (declarationSourceFile && declarationSourceFile !== sourceFile) {
                                    addReferencedFile(declarationSourceFile.resolvedPath);
                                }
                            }
                        }