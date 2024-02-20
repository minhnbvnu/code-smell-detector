function createCompilerHostFromProgramHost(host, getCompilerOptions, directoryStructureHost = host) {
            const useCaseSensitiveFileNames = host.useCaseSensitiveFileNames();
            const compilerHost = {
                getSourceFile: createGetSourceFile((fileName, encoding) => !encoding ? compilerHost.readFile(fileName) : host.readFile(fileName, encoding), getCompilerOptions, 
                /*setParentNodes*/
                void 0),
                getDefaultLibLocation: maybeBind(host, host.getDefaultLibLocation),
                getDefaultLibFileName: (options) => host.getDefaultLibFileName(options),
                writeFile: createWriteFileMeasuringIO((path, data, writeByteOrderMark) => host.writeFile(path, data, writeByteOrderMark), (path) => host.createDirectory(path), (path) => host.directoryExists(path)),
                getCurrentDirectory: memoize(() => host.getCurrentDirectory()),
                useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
                getCanonicalFileName: createGetCanonicalFileName(useCaseSensitiveFileNames),
                getNewLine: () => getNewLineCharacter(getCompilerOptions()),
                fileExists: (f) => host.fileExists(f),
                readFile: (f) => host.readFile(f),
                trace: maybeBind(host, host.trace),
                directoryExists: maybeBind(directoryStructureHost, directoryStructureHost.directoryExists),
                getDirectories: maybeBind(directoryStructureHost, directoryStructureHost.getDirectories),
                realpath: maybeBind(host, host.realpath),
                getEnvironmentVariable: maybeBind(host, host.getEnvironmentVariable) || (() => ""),
                createHash: maybeBind(host, host.createHash),
                readDirectory: maybeBind(host, host.readDirectory),
                storeFilesChangingSignatureDuringEmit: host.storeFilesChangingSignatureDuringEmit
            };
            return compilerHost;
        }