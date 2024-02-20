function updateFilesOfFileSystemEntry(parentResult, baseName, fileExists2) {
                const canonicalizedFiles = parentResult.sortedAndCanonicalizedFiles;
                const canonicalizedBaseName = getCanonicalFileName(baseName);
                if (fileExists2) {
                    if (insertSorted(canonicalizedFiles, canonicalizedBaseName, compareStringsCaseSensitive)) {
                        parentResult.files.push(baseName);
                    }
                }
                else {
                    const sortedIndex = binarySearch(canonicalizedFiles, canonicalizedBaseName, identity, compareStringsCaseSensitive);
                    if (sortedIndex >= 0) {
                        canonicalizedFiles.splice(sortedIndex, 1);
                        const unsortedIndex = parentResult.files.findIndex((entry) => getCanonicalFileName(entry) === canonicalizedBaseName);
                        parentResult.files.splice(unsortedIndex, 1);
                    }
                }
            }