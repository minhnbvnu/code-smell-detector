function addSourceFile(sourceFile) {
                            if (!programOfThisState.isSourceFileDefaultLibrary(sourceFile)) {
                                (result || (result = [])).push(sourceFile);
                            }
                        }