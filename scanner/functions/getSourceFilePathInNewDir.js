function getSourceFilePathInNewDir(fileName, host, newDirPath) {
            return getSourceFilePathInNewDirWorker(fileName, newDirPath, host.getCurrentDirectory(), host.getCommonSourceDirectory(), (f) => host.getCanonicalFileName(f));
        }