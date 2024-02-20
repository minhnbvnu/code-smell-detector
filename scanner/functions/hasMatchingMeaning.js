function hasMatchingMeaning(referenceLocation, state) {
                        return !!(getMeaningFromLocation(referenceLocation) & state.searchMeaning);
                    }