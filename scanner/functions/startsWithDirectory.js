function startsWithDirectory(fileName, directoryName, getCanonicalFileName) {
            const canonicalFileName = getCanonicalFileName(fileName);
            const canonicalDirectoryName = getCanonicalFileName(directoryName);
            return startsWith(canonicalFileName, canonicalDirectoryName + "/") || startsWith(canonicalFileName, canonicalDirectoryName + "\\");
        }