function getFilesAffectedByWithOldState(state, programOfThisState, path, cancellationToken, host) {
                        const sourceFile = programOfThisState.getSourceFileByPath(path);
                        if (!sourceFile) {
                            return emptyArray;
                        }
                        if (!updateShapeSignature(state, programOfThisState, sourceFile, cancellationToken, host)) {
                            return [sourceFile];
                        }
                        return (state.referencedMap ? getFilesAffectedByUpdatedShapeWhenModuleEmit : getFilesAffectedByUpdatedShapeWhenNonModuleEmit)(state, programOfThisState, sourceFile, cancellationToken, host);
                    }