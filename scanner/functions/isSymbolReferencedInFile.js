function isSymbolReferencedInFile(definition, checker, sourceFile, searchContainer = sourceFile) {
                        return eachSymbolReferenceInFile(definition, checker, sourceFile, () => true, searchContainer) || false;
                    }