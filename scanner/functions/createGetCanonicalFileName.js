function createGetCanonicalFileName(useCaseSensitiveFileNames) {
            return useCaseSensitiveFileNames ? identity : toFileNameLowerCase;
        }