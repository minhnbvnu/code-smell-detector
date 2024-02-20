function getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory) {
            path = normalizePath(path);
            currentDirectory = normalizePath(currentDirectory);
            const absolutePath = combinePaths(currentDirectory, path);
            return {
                includeFilePatterns: map(getRegularExpressionsForWildcards(includes, absolutePath, "files"), (pattern) => `^${pattern}$`),
                includeFilePattern: getRegularExpressionForWildcard(includes, absolutePath, "files"),
                includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
                excludePattern: getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
                basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames)
            };
        }