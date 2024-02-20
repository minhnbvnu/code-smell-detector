function writeFileEnsuringDirectories(path, data, writeByteOrderMark, writeFile2, createDirectory, directoryExists) {
            try {
                writeFile2(path, data, writeByteOrderMark);
            }
            catch (e) {
                ensureDirectoriesExist(getDirectoryPath(normalizePath(path)), createDirectory, directoryExists);
                writeFile2(path, data, writeByteOrderMark);
            }
        }