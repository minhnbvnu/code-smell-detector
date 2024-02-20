function getFileWatcherEventKind(oldTime, newTime) {
            return oldTime === 0 ? 0 /* Created */ : newTime === 0 ? 2 /* Deleted */ : 1 /* Changed */;
        }