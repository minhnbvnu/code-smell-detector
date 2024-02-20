function reloadConfigFile() {
                Debug.assert(configFileName);
                writeLog(`Reloading config file: ${configFileName}`);
                reloadLevel = 0 /* None */;
                if (cachedDirectoryStructureHost) {
                    cachedDirectoryStructureHost.clearCache();
                }
                parseConfigFile2();
                hasChangedCompilerOptions = true;
                synchronizeProgram();
                watchConfigFileWildCardDirectories();
                updateExtendedConfigFilesWatches(toPath3(configFileName), compilerOptions, watchOptions, WatchType.ExtendedConfigFile);
            }