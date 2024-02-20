function patchWriteFileEnsuringDirectory(sys2) {
            const originalWriteFile = sys2.writeFile;
            sys2.writeFile = (path, data, writeBom) => writeFileEnsuringDirectories(path, data, !!writeBom, (path2, data2, writeByteOrderMark) => originalWriteFile.call(sys2, path2, data2, writeByteOrderMark), (path2) => sys2.createDirectory(path2), (path2) => sys2.directoryExists(path2));
        }