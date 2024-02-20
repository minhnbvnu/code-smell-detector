function tryReadDirectory(host, path, extensions, exclude, include) {
            return tryIOAndConsumeErrors(host, host.readDirectory, path, extensions, exclude, include) || emptyArray;
        }