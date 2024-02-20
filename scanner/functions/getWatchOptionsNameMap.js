function getWatchOptionsNameMap() {
            return watchOptionsNameMapCache || (watchOptionsNameMapCache = createOptionNameMap(optionsForWatch));
        }