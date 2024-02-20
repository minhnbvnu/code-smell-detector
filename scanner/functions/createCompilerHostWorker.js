function createCompilerHostWorker(options, setParentNodes, system = sys) {
            const existingDirectories = /* @__PURE__ */ new Map();
            const getCanonicalFileName = createGetCanonicalFileName(system.useCaseSensitiveFileNames);
            function directoryExists(directoryPath) {
                if (existingDirectories.has(directoryPath)) {
                    return true;
                }
                if ((compilerHost.directoryExists || system.directoryExists)(directoryPath)) {
                    existingDirectories.set(directoryPath, true);
                    return true;
                }
                return false;
            }
            function getDefaultLibLocation() {
                return getDirectoryPath(normalizePath(system.getExecutingFilePath()));
            }
            const newLine = getNewLineCharacter(options);
            const realpath = system.realpath && ((path) => system.realpath(path));
            const compilerHost = {
                getSourceFile: createGetSourceFile((fileName) => compilerHost.readFile(fileName), () => options, setParentNodes),
                getDefaultLibLocation,
                getDefaultLibFileName: (options2) => combinePaths(getDefaultLibLocation(), getDefaultLibFileName(options2)),
                writeFile: createWriteFileMeasuringIO((path, data, writeByteOrderMark) => system.writeFile(path, data, writeByteOrderMark), (path) => (compilerHost.createDirectory || system.createDirectory)(path), (path) => directoryExists(path)),
                getCurrentDirectory: memoize(() => system.getCurrentDirectory()),
                useCaseSensitiveFileNames: () => system.useCaseSensitiveFileNames,
                getCanonicalFileName,
                getNewLine: () => newLine,
                fileExists: (fileName) => system.fileExists(fileName),
                readFile: (fileName) => system.readFile(fileName),
                trace: (s) => system.write(s + newLine),
                directoryExists: (directoryName) => system.directoryExists(directoryName),
                getEnvironmentVariable: (name) => system.getEnvironmentVariable ? system.getEnvironmentVariable(name) : "",
                getDirectories: (path) => system.getDirectories(path),
                realpath,
                readDirectory: (path, extensions, include, exclude, depth) => system.readDirectory(path, extensions, include, exclude, depth),
                createDirectory: (d) => system.createDirectory(d),
                createHash: maybeBind(system, system.createHash)
            };
            return compilerHost;
        }