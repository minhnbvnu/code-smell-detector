function canReuseOldState(newReferencedMap, oldState) {
                        return oldState && !oldState.referencedMap === !newReferencedMap;
                    }