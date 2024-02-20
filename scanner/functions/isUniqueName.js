function isUniqueName(name, privateName) {
                return isFileLevelUniqueName2(name, privateName) && !isReservedName(name, privateName) && !generatedNames.has(name);
            }