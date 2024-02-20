function updateExtendedConfigFilesWatches(forProjectPath, options, watchOptions2, watchType) {
                updateSharedExtendedConfigFileWatcher(forProjectPath, options, sharedExtendedConfigFileWatchers || (sharedExtendedConfigFileWatchers = /* @__PURE__ */ new Map()), (extendedConfigFileName, extendedConfigFilePath) => watchFile2(extendedConfigFileName, (_fileName, eventKind) => {
                    var _a2;
                    updateCachedSystemWithFile(extendedConfigFileName, extendedConfigFilePath, eventKind);
                    if (extendedConfigCache)
                        cleanExtendedConfigCache(extendedConfigCache, extendedConfigFilePath, toPath3);
                    const projects = (_a2 = sharedExtendedConfigFileWatchers.get(extendedConfigFilePath)) == null ? void 0 : _a2.projects;
                    if (!(projects == null ? void 0 : projects.size))
                        return;
                    projects.forEach((projectPath) => {
                        if (configFileName && toPath3(configFileName) === projectPath) {
                            reloadLevel = 2 /* Full */;
                        }
                        else {
                            const config = parsedConfigs == null ? void 0 : parsedConfigs.get(projectPath);
                            if (config)
                                config.reloadLevel = 2 /* Full */;
                            resolutionCache.removeResolutionsFromProjectReferenceRedirects(projectPath);
                        }
                        scheduleProgramUpdate();
                    });
                }, 2e3 /* High */, watchOptions2, watchType), toPath3);
            }