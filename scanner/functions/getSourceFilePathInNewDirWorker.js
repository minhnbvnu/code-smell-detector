function getSourceFilePathInNewDirWorker(fileName, newDirPath, currentDirectory, commonSourceDirectory, getCanonicalFileName) {
            let sourceFilePath = getNormalizedAbsolutePath(fileName, currentDirectory);
            const isSourceFileInCommonSourceDirectory = getCanonicalFileName(sourceFilePath).indexOf(getCanonicalFileName(commonSourceDirectory)) === 0;
            sourceFilePath = isSourceFileInCommonSourceDirectory ? sourceFilePath.substring(commonSourceDirectory.length) : sourceFilePath;
            return combinePaths(newDirPath, sourceFilePath);
        }