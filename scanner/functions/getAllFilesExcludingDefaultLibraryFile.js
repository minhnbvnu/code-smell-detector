function getAllFilesExcludingDefaultLibraryFile(state, programOfThisState, firstSourceFile) {
                        if (state.allFilesExcludingDefaultLibraryFile) {
                            return state.allFilesExcludingDefaultLibraryFile;
                        }
                        let result;
                        if (firstSourceFile)
                            addSourceFile(firstSourceFile);
                        for (const sourceFile of programOfThisState.getSourceFiles()) {
                            if (sourceFile !== firstSourceFile) {
                                addSourceFile(sourceFile);
                            }
                        }
                        state.allFilesExcludingDefaultLibraryFile = result || emptyArray;
                        return state.allFilesExcludingDefaultLibraryFile;
                        function addSourceFile(sourceFile) {
                            if (!programOfThisState.isSourceFileDefaultLibrary(sourceFile)) {
                                (result || (result = [])).push(sourceFile);
                            }
                        }
                    }