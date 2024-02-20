function locationInfo(diagnostic) {
                if (diagnostic.file.resolvedPath === sourceFile.resolvedPath)
                    return `(${diagnostic.start},${diagnostic.length})`;
                if (sourceFileDirectory === void 0)
                    sourceFileDirectory = getDirectoryPath(sourceFile.resolvedPath);
                return `${ensurePathIsNonModuleName(getRelativePathFromDirectory(sourceFileDirectory, diagnostic.file.resolvedPath, program.getCanonicalFileName))}(${diagnostic.start},${diagnostic.length})`;
            }