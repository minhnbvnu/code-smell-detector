function callbackChangingToMissingFileSystemEntry(event, relativeName) {
                    let originalRelativeName;
                    if (relativeName && endsWith(relativeName, "~")) {
                        originalRelativeName = relativeName;
                        relativeName = relativeName.slice(0, relativeName.length - 1);
                    }
                    if (event === "rename" && (!relativeName || relativeName === lastDirectoryPart || endsWith(relativeName, lastDirectoryPartWithDirectorySeparator))) {
                        const modifiedTime = getModifiedTime3(fileOrDirectory) || missingFileModifiedTime;
                        if (originalRelativeName)
                            callback(event, originalRelativeName, modifiedTime);
                        callback(event, relativeName, modifiedTime);
                        if (inodeWatching) {
                            updateWatcher(modifiedTime === missingFileModifiedTime ? watchMissingFileSystemEntry : watchPresentFileSystemEntry);
                        }
                        else if (modifiedTime === missingFileModifiedTime) {
                            updateWatcher(watchMissingFileSystemEntry);
                        }
                    }
                    else {
                        if (originalRelativeName)
                            callback(event, originalRelativeName);
                        callback(event, relativeName);
                    }
                }