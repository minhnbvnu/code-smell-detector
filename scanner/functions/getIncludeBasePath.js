function getIncludeBasePath(absolute) {
            const wildcardOffset = indexOfAnyCharCode(absolute, wildcardCharCodes);
            if (wildcardOffset < 0) {
                return !hasExtension(absolute) ? absolute : removeTrailingDirectorySeparator(getDirectoryPath(absolute));
            }
            return absolute.substring(0, absolute.lastIndexOf(directorySeparator, wildcardOffset));
        }