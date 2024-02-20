function getReferencesInContainer(container, sourceFile, search, state, addReferencesHere) {
                        if (!state.markSearchedSymbols(sourceFile, search.allSearchSymbols)) {
                            return;
                        }
                        for (const position of getPossibleSymbolReferencePositions(sourceFile, search.text, container)) {
                            getReferencesAtLocation(sourceFile, position, search, state, addReferencesHere);
                        }
                    }