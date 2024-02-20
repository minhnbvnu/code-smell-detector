function getReferencesInContainerOrFiles(symbol, state, search) {
                        const scope = getSymbolScope(symbol);
                        if (scope) {
                            getReferencesInContainer(scope, scope.getSourceFile(), search, state, 
                            /*addReferencesHere*/
                            !(isSourceFile(scope) && !contains(state.sourceFiles, scope)));
                        }
                        else {
                            for (const sourceFile of state.sourceFiles) {
                                state.cancellationToken.throwIfCancellationRequested();
                                searchForName(sourceFile, search, state);
                            }
                        }
                    }