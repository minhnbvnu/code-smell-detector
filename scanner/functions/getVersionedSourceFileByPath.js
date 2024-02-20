function getVersionedSourceFileByPath(fileName, path, languageVersionOrOptions, onError, shouldCreateNewSourceFile) {
                const hostSourceFile = sourceFilesCache.get(path);
                if (isFileMissingOnHost(hostSourceFile)) {
                    return void 0;
                }
                if (hostSourceFile === void 0 || shouldCreateNewSourceFile || isFilePresenceUnknownOnHost(hostSourceFile)) {
                    const sourceFile = getNewSourceFile(fileName, languageVersionOrOptions, onError);
                    if (hostSourceFile) {
                        if (sourceFile) {
                            hostSourceFile.sourceFile = sourceFile;
                            hostSourceFile.version = sourceFile.version;
                            if (!hostSourceFile.fileWatcher) {
                                hostSourceFile.fileWatcher = watchFilePath(path, fileName, onSourceFileChange, 250 /* Low */, watchOptions, WatchType.SourceFile);
                            }
                        }
                        else {
                            if (hostSourceFile.fileWatcher) {
                                hostSourceFile.fileWatcher.close();
                            }
                            sourceFilesCache.set(path, false);
                        }
                    }
                    else {
                        if (sourceFile) {
                            const fileWatcher = watchFilePath(path, fileName, onSourceFileChange, 250 /* Low */, watchOptions, WatchType.SourceFile);
                            sourceFilesCache.set(path, { sourceFile, version: sourceFile.version, fileWatcher });
                        }
                        else {
                            sourceFilesCache.set(path, false);
                        }
                    }
                    return sourceFile;
                }
                return hostSourceFile.sourceFile;
            }