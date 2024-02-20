function shouldAddSingleReference(singleRef, state) {
                        if (!hasMatchingMeaning(singleRef, state))
                            return false;
                        if (state.options.use !== 2 /* Rename */)
                            return true;
                        if (!isIdentifier(singleRef))
                            return false;
                        return !(isImportOrExportSpecifier(singleRef.parent) && singleRef.escapedText === "default" /* Default */);
                    }