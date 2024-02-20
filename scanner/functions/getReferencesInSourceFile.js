function getReferencesInSourceFile(sourceFile, search, state, addReferencesHere = true) {
                        state.cancellationToken.throwIfCancellationRequested();
                        return getReferencesInContainer(sourceFile, sourceFile, search, state, addReferencesHere);
                    }