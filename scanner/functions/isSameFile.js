function isSameFile(file1, file2) {
                return comparePaths(file1, file2, currentDirectory, !host.useCaseSensitiveFileNames()) === 0 /* EqualTo */;
            }