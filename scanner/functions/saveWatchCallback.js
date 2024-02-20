function saveWatchCallback(trackingMap) {
        return (fileName, callback) => {
            const normalizedFileName = (0, shared_1.getCanonicalFileName)(fileName);
            const watchers = (() => {
                let watchers = trackingMap.get(normalizedFileName);
                if (!watchers) {
                    watchers = new Set();
                    trackingMap.set(normalizedFileName, watchers);
                }
                return watchers;
            })();
            watchers.add(callback);
            return {
                close: () => {
                    watchers.delete(callback);
                },
            };
        };
    }