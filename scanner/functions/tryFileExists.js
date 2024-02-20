function tryFileExists(host, path) {
            return tryIOAndConsumeErrors(host, host.fileExists, path);
        }