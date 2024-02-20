function isFileLevelUniqueName(sourceFile, name, hasGlobalName) {
            return !(hasGlobalName && hasGlobalName(name)) && !sourceFile.identifiers.has(name);
        }