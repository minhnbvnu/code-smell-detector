function watchFilePath(path, file, callback, pollingInterval, options, watchType) {
                return watchFile2(file, (fileName, eventKind) => callback(fileName, eventKind, path), pollingInterval, options, watchType);
            }