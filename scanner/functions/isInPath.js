function isInPath(path, searchPath) {
                if (stringContains(path, searchPath))
                    return true;
                if (useCaseSensitiveFileNames)
                    return false;
                return stringContains(toCanonicalFilePath(path), searchPath);
            }