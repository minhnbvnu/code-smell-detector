function getEffectiveTypeRoots(options, host) {
            if (options.typeRoots) {
                return options.typeRoots;
            }
            let currentDirectory;
            if (options.configFilePath) {
                currentDirectory = getDirectoryPath(options.configFilePath);
            }
            else if (host.getCurrentDirectory) {
                currentDirectory = host.getCurrentDirectory();
            }
            if (currentDirectory !== void 0) {
                return getDefaultTypeRoots(currentDirectory, host);
            }
        }