function isFileLevelUniqueName2(name, _isPrivate) {
                return currentSourceFile ? isFileLevelUniqueName(currentSourceFile, name, hasGlobalName) : true;
            }