function tryDirectoryExists(host, path) {
            return tryAndIgnoreErrors(() => directoryProbablyExists(path, host)) || false;
        }