function getAllFileNames(state, programOfThisState) {
                        if (!state.allFileNames) {
                            const sourceFiles = programOfThisState.getSourceFiles();
                            state.allFileNames = sourceFiles === emptyArray ? emptyArray : sourceFiles.map((file) => file.fileName);
                        }
                        return state.allFileNames;
                    }