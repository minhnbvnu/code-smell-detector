function isFileSystemCaseSensitive() {
                            if (platform === "win32" || platform === "win64") {
                                return false;
                            }
                            return !fileExists(swapCase(__filename));
                        }