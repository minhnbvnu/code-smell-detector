function searchForName(sourceFile, search, state) {
                        if (getNameTable(sourceFile).get(search.escapedText) !== void 0) {
                            getReferencesInSourceFile(sourceFile, search, state);
                        }
                    }