function watchConfigFileWildCardDirectories() {
                if (wildcardDirectories) {
                    updateWatchingWildcardDirectories(watchedWildcardDirectories || (watchedWildcardDirectories = /* @__PURE__ */ new Map()), new Map(Object.entries(wildcardDirectories)), watchWildcardDirectory);
                }
                else if (watchedWildcardDirectories) {
                    clearMap(watchedWildcardDirectories, closeFileWatcherOf);
                }
            }