function createExcludeHandlingAddWatch(key) {
                return (file, cb, flags, options, detailInfo1, detailInfo2) => {
                    var _a2;
                    return !matchesExclude(file, key === "watchFile" ? options == null ? void 0 : options.excludeFiles : options == null ? void 0 : options.excludeDirectories, useCaseSensitiveFileNames(), ((_a2 = host.getCurrentDirectory) == null ? void 0 : _a2.call(host)) || "") ? factory2[key].call(
                    /*thisArgs*/
                    void 0, file, cb, flags, options, detailInfo1, detailInfo2) : excludeWatcherFactory(file, flags, options, detailInfo1, detailInfo2);
                };
            }