function getReferencedByPaths(state, referencedFilePath) {
                        const keys = state.referencedMap.getKeys(referencedFilePath);
                        return keys ? arrayFrom(keys.keys()) : [];
                    }