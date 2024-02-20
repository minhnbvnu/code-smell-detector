function onSourceFileChange(fileName, eventKind, path) {
                updateCachedSystemWithFile(fileName, path, eventKind);
                if (eventKind === 2 /* Deleted */ && sourceFilesCache.has(path)) {
                    resolutionCache.invalidateResolutionOfFile(path);
                }
                nextSourceFileVersion(path);
                scheduleProgramUpdate();
            }