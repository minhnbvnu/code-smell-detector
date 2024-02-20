function createFileWatcherWithLogging(file, cb, flags, options, detailInfo1, detailInfo2) {
                log(`FileWatcher:: Added:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
                const watcher = triggerInvokingFactory.watchFile(file, cb, flags, options, detailInfo1, detailInfo2);
                return {
                    close: () => {
                        log(`FileWatcher:: Close:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
                        watcher.close();
                    }
                };
            }