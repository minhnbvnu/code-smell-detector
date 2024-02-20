function sourceFileNotUptoDate(sourceFile) {
                return !sourceFileVersionUptoDate(sourceFile) || hasInvalidatedResolutions(sourceFile.path);
            }