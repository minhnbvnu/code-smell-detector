function createDirectoryWatcherWithLogging(file, cb, flags, options, detailInfo1, detailInfo2) {
                const watchInfo = `DirectoryWatcher:: Added:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`;
                log(watchInfo);
                const start = timestamp();
                const watcher = triggerInvokingFactory.watchDirectory(file, cb, flags, options, detailInfo1, detailInfo2);
                const elapsed = timestamp() - start;
                log(`Elapsed:: ${elapsed}ms ${watchInfo}`);
                return {
                    close: () => {
                        const watchInfo2 = `DirectoryWatcher:: Close:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`;
                        log(watchInfo2);
                        const start2 = timestamp();
                        watcher.close();
                        const elapsed2 = timestamp() - start2;
                        log(`Elapsed:: ${elapsed2}ms ${watchInfo2}`);
                    }
                };
            }