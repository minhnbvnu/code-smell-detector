function createWriteFileMeasuringIO(actualWriteFile, createDirectory, directoryExists) {
            return (fileName, data, writeByteOrderMark, onError) => {
                try {
                    mark("beforeIOWrite");
                    writeFileEnsuringDirectories(fileName, data, writeByteOrderMark, actualWriteFile, createDirectory, directoryExists);
                    mark("afterIOWrite");
                    measure("I/O Write", "beforeIOWrite", "afterIOWrite");
                }
                catch (e) {
                    if (onError) {
                        onError(e.message);
                    }
                }
            };
        }