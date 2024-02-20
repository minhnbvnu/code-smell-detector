function createDirectoryStructure(ioHost, dirName) {
        if(ioHost.directoryExists(dirName)) {
            return;
        }
        var parentDirectory = ioHost.dirName(dirName);
        if(parentDirectory != "") {
            createDirectoryStructure(ioHost, parentDirectory);
        }
        ioHost.createDirectory(dirName);
    }