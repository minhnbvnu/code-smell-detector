function clearSharedExtendedConfigFileWatcher(projectPath, extendedConfigFilesMap) {
            extendedConfigFilesMap.forEach((watcher) => {
                if (watcher.projects.delete(projectPath))
                    watcher.close();
            });
        }