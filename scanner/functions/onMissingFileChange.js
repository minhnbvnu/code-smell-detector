function onMissingFileChange(fileName, eventKind, missingFilePath) {
                updateCachedSystemWithFile(fileName, missingFilePath, eventKind);
                if (eventKind === 0 /* Created */ && missingFilesMap.has(missingFilePath)) {
                    missingFilesMap.get(missingFilePath).close();
                    missingFilesMap.delete(missingFilePath);
                    nextSourceFileVersion(missingFilePath);
                    scheduleProgramUpdate();
                }
            }