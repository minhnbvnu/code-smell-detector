function watchReferencedProject(configFileName2, configPath, commandLine) {
                var _a2, _b, _c, _d, _e;
                commandLine.watcher || (commandLine.watcher = watchFile2(configFileName2, (_fileName, eventKind) => {
                    updateCachedSystemWithFile(configFileName2, configPath, eventKind);
                    const config = parsedConfigs == null ? void 0 : parsedConfigs.get(configPath);
                    if (config)
                        config.reloadLevel = 2 /* Full */;
                    resolutionCache.removeResolutionsFromProjectReferenceRedirects(configPath);
                    scheduleProgramUpdate();
                }, 2e3 /* High */, ((_a2 = commandLine.parsedCommandLine) == null ? void 0 : _a2.watchOptions) || watchOptions, WatchType.ConfigFileOfReferencedProject));
                if ((_b = commandLine.parsedCommandLine) == null ? void 0 : _b.wildcardDirectories) {
                    updateWatchingWildcardDirectories(commandLine.watchedDirectories || (commandLine.watchedDirectories = /* @__PURE__ */ new Map()), new Map(Object.entries((_c = commandLine.parsedCommandLine) == null ? void 0 : _c.wildcardDirectories)), (directory, flags) => {
                        var _a3;
                        return watchDirectory(directory, (fileOrDirectory) => {
                            const fileOrDirectoryPath = toPath3(fileOrDirectory);
                            if (cachedDirectoryStructureHost) {
                                cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                            }
                            nextSourceFileVersion(fileOrDirectoryPath);
                            const config = parsedConfigs == null ? void 0 : parsedConfigs.get(configPath);
                            if (!(config == null ? void 0 : config.parsedCommandLine))
                                return;
                            if (isIgnoredFileFromWildCardWatching({
                                watchedDirPath: toPath3(directory),
                                fileOrDirectory,
                                fileOrDirectoryPath,
                                configFileName: configFileName2,
                                options: config.parsedCommandLine.options,
                                program: config.parsedCommandLine.fileNames,
                                currentDirectory,
                                useCaseSensitiveFileNames,
                                writeLog,
                                toPath: toPath3
                            }))
                                return;
                            if (config.reloadLevel !== 2 /* Full */) {
                                config.reloadLevel = 1 /* Partial */;
                                scheduleProgramUpdate();
                            }
                        }, flags, ((_a3 = commandLine.parsedCommandLine) == null ? void 0 : _a3.watchOptions) || watchOptions, WatchType.WildcardDirectoryOfReferencedProject);
                    });
                }
                else if (commandLine.watchedDirectories) {
                    clearMap(commandLine.watchedDirectories, closeFileWatcherOf);
                    commandLine.watchedDirectories = void 0;
                }
                updateExtendedConfigFilesWatches(configPath, (_d = commandLine.parsedCommandLine) == null ? void 0 : _d.options, ((_e = commandLine.parsedCommandLine) == null ? void 0 : _e.watchOptions) || watchOptions, WatchType.ExtendedConfigOfReferencedProject);
            }