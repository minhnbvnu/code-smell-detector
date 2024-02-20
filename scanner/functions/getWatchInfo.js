function getWatchInfo(file, flags, options, detailInfo1, detailInfo2, getDetailWatchInfo2) {
                return `WatchInfo: ${file} ${flags} ${JSON.stringify(options)} ${getDetailWatchInfo2 ? getDetailWatchInfo2(detailInfo1, detailInfo2) : detailInfo2 === void 0 ? detailInfo1 : `${detailInfo1} ${detailInfo2}`}`;
            }