function onWatchedFileStat(watchedFile, modifiedTime) {
            const oldTime = watchedFile.mtime.getTime();
            const newTime = modifiedTime.getTime();
            if (oldTime !== newTime) {
                watchedFile.mtime = modifiedTime;
                watchedFile.callback(watchedFile.fileName, getFileWatcherEventKind(oldTime, newTime), modifiedTime);
                return true;
            }
            return false;
        }