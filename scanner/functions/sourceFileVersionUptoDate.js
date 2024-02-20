function sourceFileVersionUptoDate(sourceFile) {
                return sourceFile.version === getSourceVersion(sourceFile.resolvedPath, sourceFile.fileName);
            }