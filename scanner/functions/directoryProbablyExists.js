function directoryProbablyExists(directoryName, host) {
            return !host.directoryExists || host.directoryExists(directoryName);
        }