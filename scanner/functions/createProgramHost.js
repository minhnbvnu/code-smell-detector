function createProgramHost(system, createProgram2) {
            const getDefaultLibLocation = memoize(() => getDirectoryPath(normalizePath(system.getExecutingFilePath())));
            return {
                useCaseSensitiveFileNames: () => system.useCaseSensitiveFileNames,
                getNewLine: () => system.newLine,
                getCurrentDirectory: memoize(() => system.getCurrentDirectory()),
                getDefaultLibLocation,
                getDefaultLibFileName: (options) => combinePaths(getDefaultLibLocation(), getDefaultLibFileName(options)),
                fileExists: (path) => system.fileExists(path),
                readFile: (path, encoding) => system.readFile(path, encoding),
                directoryExists: (path) => system.directoryExists(path),
                getDirectories: (path) => system.getDirectories(path),
                readDirectory: (path, extensions, exclude, include, depth) => system.readDirectory(path, extensions, exclude, include, depth),
                realpath: maybeBind(system, system.realpath),
                getEnvironmentVariable: maybeBind(system, system.getEnvironmentVariable),
                trace: (s) => system.write(s + system.newLine),
                createDirectory: (path) => system.createDirectory(path),
                writeFile: (path, data, writeByteOrderMark) => system.writeFile(path, data, writeByteOrderMark),
                createHash: maybeBind(system, system.createHash),
                createProgram: createProgram2 || createEmitAndSemanticDiagnosticsBuilderProgram,
                storeFilesChangingSignatureDuringEmit: system.storeFilesChangingSignatureDuringEmit,
                now: maybeBind(system, system.now)
            };
        }