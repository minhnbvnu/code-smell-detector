function createFileAndFolderStructure(ioHost, fileName, useUTF8) {
        var path = ioHost.resolvePath(fileName);
        var dirName = ioHost.dirName(path);
        createDirectoryStructure(ioHost, dirName);
        return ioHost.createFile(path, useUTF8);
    }