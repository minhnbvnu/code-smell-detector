function relativePath(path) {
                return getRelativePathFromDirectory(configDir, path, 
                /*ignoreCase*/
                !useCaseSensitiveFileNames);
            }