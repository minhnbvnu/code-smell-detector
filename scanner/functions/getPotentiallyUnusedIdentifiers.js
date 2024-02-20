function getPotentiallyUnusedIdentifiers(sourceFile) {
                return allPotentiallyUnusedIdentifiers.get(sourceFile.path) || emptyArray;
            }