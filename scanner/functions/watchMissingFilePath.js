function watchMissingFilePath(missingFilePath) {
                return (parsedConfigs == null ? void 0 : parsedConfigs.has(missingFilePath)) ? noopFileWatcher : watchFilePath(missingFilePath, missingFilePath, onMissingFileChange, 500 /* Medium */, watchOptions, WatchType.MissingFile);
            }