function watchWildcardDirectory(directory, flags) {
                return watchDirectory(directory, (fileOrDirectory) => {
                    Debug.assert(configFileName);
                    Debug.assert(compilerOptions);
                    const fileOrDirectoryPath = toPath3(fileOrDirectory);
                    if (cachedDirectoryStructureHost) {
                        cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                    }
                    nextSourceFileVersion(fileOrDirectoryPath);
                    if (isIgnoredFileFromWildCardWatching({
                        watchedDirPath: toPath3(directory),
                        fileOrDirectory,
                        fileOrDirectoryPath,
                        configFileName,
                        extraFileExtensions,
                        options: compilerOptions,
                        program: getCurrentBuilderProgram() || rootFileNames,
                        currentDirectory,
                        useCaseSensitiveFileNames,
                        writeLog,
                        toPath: toPath3
                    }))
                        return;
                    if (reloadLevel !== 2 /* Full */) {
                        reloadLevel = 1 /* Partial */;
                        scheduleProgramUpdate();
                    }
                }, flags, watchOptions, WatchType.WildcardDirectory);
            }