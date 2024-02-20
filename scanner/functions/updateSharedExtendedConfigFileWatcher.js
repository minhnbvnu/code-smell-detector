function updateSharedExtendedConfigFileWatcher(projectPath, options, extendedConfigFilesMap, createExtendedConfigFileWatch, toPath3) {
            var _a2;
            const extendedConfigs = arrayToMap(((_a2 = options == null ? void 0 : options.configFile) == null ? void 0 : _a2.extendedSourceFiles) || emptyArray, toPath3);
            extendedConfigFilesMap.forEach((watcher, extendedConfigFilePath) => {
                if (!extendedConfigs.has(extendedConfigFilePath)) {
                    watcher.projects.delete(projectPath);
                    watcher.close();
                }
            });
            extendedConfigs.forEach((extendedConfigFileName, extendedConfigFilePath) => {
                const existing = extendedConfigFilesMap.get(extendedConfigFilePath);
                if (existing) {
                    existing.projects.add(projectPath);
                }
                else {
                    extendedConfigFilesMap.set(extendedConfigFilePath, {
                        projects: /* @__PURE__ */ new Set([projectPath]),
                        watcher: createExtendedConfigFileWatch(extendedConfigFileName, extendedConfigFilePath),
                        close: () => {
                            const existing2 = extendedConfigFilesMap.get(extendedConfigFilePath);
                            if (!existing2 || existing2.projects.size !== 0)
                                return;
                            existing2.watcher.close();
                            extendedConfigFilesMap.delete(extendedConfigFilePath);
                        }
                    });
                }
            });
        }