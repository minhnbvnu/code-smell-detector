function getFilesAffectedByUpdatedShapeWhenNonModuleEmit(state, programOfThisState, sourceFileWithUpdatedShape) {
                        const compilerOptions = programOfThisState.getCompilerOptions();
                        if (compilerOptions && outFile(compilerOptions)) {
                            return [sourceFileWithUpdatedShape];
                        }
                        return getAllFilesExcludingDefaultLibraryFile(state, programOfThisState, sourceFileWithUpdatedShape);
                    }