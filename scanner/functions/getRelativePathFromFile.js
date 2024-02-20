function getRelativePathFromFile(from, to, getCanonicalFileName) {
            return ensurePathIsNonModuleName(getRelativePathFromDirectory(getDirectoryPath(from), to, getCanonicalFileName));
        }