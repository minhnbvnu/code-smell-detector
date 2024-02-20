function createExcludeWatcherWithLogging(file, flags, options, detailInfo1, detailInfo2) {
                log(`ExcludeWatcher:: Added:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`);
                return {
                    close: () => log(`ExcludeWatcher:: Close:: ${getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo)}`)
                };
            }