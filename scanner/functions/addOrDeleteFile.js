function addOrDeleteFile(fileName, filePath, eventKind) {
                if (eventKind === 1 /* Changed */) {
                    return;
                }
                const parentResult = getCachedFileSystemEntriesForBaseDir(filePath);
                if (parentResult) {
                    updateFilesOfFileSystemEntry(parentResult, getBaseNameOfFileName(fileName), eventKind === 0 /* Created */);
                }
            }