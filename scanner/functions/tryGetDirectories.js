function tryGetDirectories(host, directoryName) {
            return tryIOAndConsumeErrors(host, host.getDirectories, directoryName) || [];
        }