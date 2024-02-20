function getCommonSourceDirectory(options, emittedFiles, currentDirectory, getCanonicalFileName, checkSourceFilesBelongToPath) {
            let commonSourceDirectory;
            if (options.rootDir) {
                commonSourceDirectory = getNormalizedAbsolutePath(options.rootDir, currentDirectory);
                checkSourceFilesBelongToPath == null ? void 0 : checkSourceFilesBelongToPath(options.rootDir);
            }
            else if (options.composite && options.configFilePath) {
                commonSourceDirectory = getDirectoryPath(normalizeSlashes(options.configFilePath));
                checkSourceFilesBelongToPath == null ? void 0 : checkSourceFilesBelongToPath(commonSourceDirectory);
            }
            else {
                commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(emittedFiles(), currentDirectory, getCanonicalFileName);
            }
            if (commonSourceDirectory && commonSourceDirectory[commonSourceDirectory.length - 1] !== directorySeparator) {
                commonSourceDirectory += directorySeparator;
            }
            return commonSourceDirectory;
        }