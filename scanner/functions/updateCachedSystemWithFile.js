function updateCachedSystemWithFile(fileName, path, eventKind) {
                if (cachedDirectoryStructureHost) {
                    cachedDirectoryStructureHost.addOrDeleteFile(fileName, path, eventKind);
                }
            }