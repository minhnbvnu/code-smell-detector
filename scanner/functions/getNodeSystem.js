function getNodeSystem() {
                        const nativePattern = /^native |^\([^)]+\)$|^(internal[\\/]|[a-zA-Z0-9_\s]+(\.js)?$)/;
                        const _fs = require("fs");
                        const _path = require("path");
                        const _os = require("os");
                        let _crypto;
                        try {
                            _crypto = require("crypto");
                        }
                        catch (e) {
                            _crypto = void 0;
                        }
                        let activeSession;
                        let profilePath = "./profile.cpuprofile";
                        const Buffer2 = require("buffer").Buffer;
                        const isLinuxOrMacOs = process.platform === "linux" || process.platform === "darwin";
                        const platform = _os.platform();
                        const useCaseSensitiveFileNames = isFileSystemCaseSensitive();
                        const fsRealpath = !!_fs.realpathSync.native ? process.platform === "win32" ? fsRealPathHandlingLongPath : _fs.realpathSync.native : _fs.realpathSync;
                        const executingFilePath = __filename.endsWith("sys.js") ? _path.join(_path.dirname(__dirname), "__fake__.js") : __filename;
                        const fsSupportsRecursiveFsWatch = process.platform === "win32" || process.platform === "darwin";
                        const getCurrentDirectory = memoize(() => process.cwd());
                        const { watchFile: watchFile2, watchDirectory } = createSystemWatchFunctions({
                            pollingWatchFileWorker: fsWatchFileWorker,
                            getModifiedTime: getModifiedTime3,
                            setTimeout,
                            clearTimeout,
                            fsWatchWorker,
                            useCaseSensitiveFileNames,
                            getCurrentDirectory,
                            fileSystemEntryExists,
                            // Node 4.0 `fs.watch` function supports the "recursive" option on both OSX and Windows
                            // (ref: https://github.com/nodejs/node/pull/2649 and https://github.com/Microsoft/TypeScript/issues/4643)
                            fsSupportsRecursiveFsWatch,
                            getAccessibleSortedChildDirectories: (path) => getAccessibleFileSystemEntries(path).directories,
                            realpath,
                            tscWatchFile: process.env.TSC_WATCHFILE,
                            useNonPollingWatchers: process.env.TSC_NONPOLLING_WATCHER,
                            tscWatchDirectory: process.env.TSC_WATCHDIRECTORY,
                            inodeWatching: isLinuxOrMacOs,
                            sysLog
                        });
                        const nodeSystem = {
                            args: process.argv.slice(2),
                            newLine: _os.EOL,
                            useCaseSensitiveFileNames,
                            write(s) {
                                process.stdout.write(s);
                            },
                            getWidthOfTerminal() {
                                return process.stdout.columns;
                            },
                            writeOutputIsTTY() {
                                return process.stdout.isTTY;
                            },
                            readFile,
                            writeFile: writeFile2,
                            watchFile: watchFile2,
                            watchDirectory,
                            resolvePath: (path) => _path.resolve(path),
                            fileExists,
                            directoryExists,
                            createDirectory(directoryName) {
                                if (!nodeSystem.directoryExists(directoryName)) {
                                    try {
                                        _fs.mkdirSync(directoryName);
                                    }
                                    catch (e) {
                                        if (e.code !== "EEXIST") {
                                            throw e;
                                        }
                                    }
                                }
                            },
                            getExecutingFilePath() {
                                return executingFilePath;
                            },
                            getCurrentDirectory,
                            getDirectories,
                            getEnvironmentVariable(name) {
                                return process.env[name] || "";
                            },
                            readDirectory,
                            getModifiedTime: getModifiedTime3,
                            setModifiedTime,
                            deleteFile,
                            createHash: _crypto ? createSHA256Hash : generateDjb2Hash,
                            createSHA256Hash: _crypto ? createSHA256Hash : void 0,
                            getMemoryUsage() {
                                if (global.gc) {
                                    global.gc();
                                }
                                return process.memoryUsage().heapUsed;
                            },
                            getFileSize(path) {
                                try {
                                    const stat = statSync(path);
                                    if (stat == null ? void 0 : stat.isFile()) {
                                        return stat.size;
                                    }
                                }
                                catch (e) {
                                }
                                return 0;
                            },
                            exit(exitCode) {
                                disableCPUProfiler(() => process.exit(exitCode));
                            },
                            enableCPUProfiler,
                            disableCPUProfiler,
                            cpuProfilingEnabled: () => !!activeSession || contains(process.execArgv, "--cpu-prof") || contains(process.execArgv, "--prof"),
                            realpath,
                            debugMode: !!process.env.NODE_INSPECTOR_IPC || !!process.env.VSCODE_INSPECTOR_OPTIONS || some(process.execArgv, (arg) => /^--(inspect|debug)(-brk)?(=\d+)?$/i.test(arg)),
                            tryEnableSourceMapsForHost() {
                                try {
                                    require(22) /* source-map-support */.install();
                                }
                                catch (e) {
                                }
                            },
                            setTimeout,
                            clearTimeout,
                            clearScreen: () => {
                                process.stdout.write("\x1Bc");
                            },
                            setBlocking: () => {
                                if (process.stdout && process.stdout._handle && process.stdout._handle.setBlocking) {
                                    process.stdout._handle.setBlocking(true);
                                }
                            },
                            bufferFrom,
                            base64decode: (input) => bufferFrom(input, "base64").toString("utf8"),
                            base64encode: (input) => bufferFrom(input).toString("base64"),
                            require: (baseDir, moduleName) => {
                                try {
                                    const modulePath = resolveJSModule(moduleName, baseDir, nodeSystem);
                                    return { module: require(modulePath), modulePath, error: void 0 };
                                }
                                catch (error) {
                                    return { module: void 0, modulePath: void 0, error };
                                }
                            }
                        };
                        return nodeSystem;
                        function statSync(path) {
                            return _fs.statSync(path, { throwIfNoEntry: false });
                        }
                        function enableCPUProfiler(path, cb) {
                            if (activeSession) {
                                cb();
                                return false;
                            }
                            const inspector = require("inspector");
                            if (!inspector || !inspector.Session) {
                                cb();
                                return false;
                            }
                            const session = new inspector.Session();
                            session.connect();
                            session.post("Profiler.enable", () => {
                                session.post("Profiler.start", () => {
                                    activeSession = session;
                                    profilePath = path;
                                    cb();
                                });
                            });
                            return true;
                        }
                        function cleanupPaths(profile) {
                            let externalFileCounter = 0;
                            const remappedPaths = /* @__PURE__ */ new Map();
                            const normalizedDir = normalizeSlashes(_path.dirname(executingFilePath));
                            const fileUrlRoot = `file://${getRootLength(normalizedDir) === 1 ? "" : "/"}${normalizedDir}`;
                            for (const node of profile.nodes) {
                                if (node.callFrame.url) {
                                    const url = normalizeSlashes(node.callFrame.url);
                                    if (containsPath(fileUrlRoot, url, useCaseSensitiveFileNames)) {
                                        node.callFrame.url = getRelativePathToDirectoryOrUrl(fileUrlRoot, url, fileUrlRoot, createGetCanonicalFileName(useCaseSensitiveFileNames), 
                                        /*isAbsolutePathAnUrl*/
                                        true);
                                    }
                                    else if (!nativePattern.test(url)) {
                                        node.callFrame.url = (remappedPaths.has(url) ? remappedPaths : remappedPaths.set(url, `external${externalFileCounter}.js`)).get(url);
                                        externalFileCounter++;
                                    }
                                }
                            }
                            return profile;
                        }
                        function disableCPUProfiler(cb) {
                            if (activeSession && activeSession !== "stopping") {
                                const s = activeSession;
                                activeSession.post("Profiler.stop", (err, { profile }) => {
                                    var _a2;
                                    if (!err) {
                                        try {
                                            if ((_a2 = statSync(profilePath)) == null ? void 0 : _a2.isDirectory()) {
                                                profilePath = _path.join(profilePath, `${( /* @__PURE__ */new Date()).toISOString().replace(/:/g, "-")}+P${process.pid}.cpuprofile`);
                                            }
                                        }
                                        catch (e) {
                                        }
                                        try {
                                            _fs.mkdirSync(_path.dirname(profilePath), { recursive: true });
                                        }
                                        catch (e) {
                                        }
                                        _fs.writeFileSync(profilePath, JSON.stringify(cleanupPaths(profile)));
                                    }
                                    activeSession = void 0;
                                    s.disconnect();
                                    cb();
                                });
                                activeSession = "stopping";
                                return true;
                            }
                            else {
                                cb();
                                return false;
                            }
                        }
                        function bufferFrom(input, encoding) {
                            return Buffer2.from && Buffer2.from !== Int8Array.from ? Buffer2.from(input, encoding) : new Buffer2(input, encoding);
                        }
                        function isFileSystemCaseSensitive() {
                            if (platform === "win32" || platform === "win64") {
                                return false;
                            }
                            return !fileExists(swapCase(__filename));
                        }
                        function swapCase(s) {
                            return s.replace(/\w/g, (ch) => {
                                const up = ch.toUpperCase();
                                return ch === up ? ch.toLowerCase() : up;
                            });
                        }
                        function fsWatchFileWorker(fileName, callback, pollingInterval) {
                            _fs.watchFile(fileName, { persistent: true, interval: pollingInterval }, fileChanged);
                            let eventKind;
                            return {
                                close: () => _fs.unwatchFile(fileName, fileChanged)
                            };
                            function fileChanged(curr, prev) {
                                const isPreviouslyDeleted = +prev.mtime === 0 || eventKind === 2 /* Deleted */;
                                if (+curr.mtime === 0) {
                                    if (isPreviouslyDeleted) {
                                        return;
                                    }
                                    eventKind = 2 /* Deleted */;
                                }
                                else if (isPreviouslyDeleted) {
                                    eventKind = 0 /* Created */;
                                }
                                else if (+curr.mtime === +prev.mtime) {
                                    return;
                                }
                                else {
                                    eventKind = 1 /* Changed */;
                                }
                                callback(fileName, eventKind, curr.mtime);
                            }
                        }
                        function fsWatchWorker(fileOrDirectory, recursive, callback) {
                            return _fs.watch(fileOrDirectory, fsSupportsRecursiveFsWatch ? { persistent: true, recursive: !!recursive } : { persistent: true }, callback);
                        }
                        function readFileWorker(fileName, _encoding) {
                            let buffer;
                            try {
                                buffer = _fs.readFileSync(fileName);
                            }
                            catch (e) {
                                return void 0;
                            }
                            let len = buffer.length;
                            if (len >= 2 && buffer[0] === 254 && buffer[1] === 255) {
                                len &= ~1;
                                for (let i = 0; i < len; i += 2) {
                                    const temp = buffer[i];
                                    buffer[i] = buffer[i + 1];
                                    buffer[i + 1] = temp;
                                }
                                return buffer.toString("utf16le", 2);
                            }
                            if (len >= 2 && buffer[0] === 255 && buffer[1] === 254) {
                                return buffer.toString("utf16le", 2);
                            }
                            if (len >= 3 && buffer[0] === 239 && buffer[1] === 187 && buffer[2] === 191) {
                                return buffer.toString("utf8", 3);
                            }
                            return buffer.toString("utf8");
                        }
                        function readFile(fileName, _encoding) {
                            perfLogger.logStartReadFile(fileName);
                            const file = readFileWorker(fileName, _encoding);
                            perfLogger.logStopReadFile();
                            return file;
                        }
                        function writeFile2(fileName, data, writeByteOrderMark) {
                            perfLogger.logEvent("WriteFile: " + fileName);
                            if (writeByteOrderMark) {
                                data = byteOrderMarkIndicator + data;
                            }
                            let fd;
                            try {
                                fd = _fs.openSync(fileName, "w");
                                _fs.writeSync(fd, data, 
                                /*position*/
                                void 0, "utf8");
                            }
                            finally {
                                if (fd !== void 0) {
                                    _fs.closeSync(fd);
                                }
                            }
                        }
                        function getAccessibleFileSystemEntries(path) {
                            perfLogger.logEvent("ReadDir: " + (path || "."));
                            try {
                                const entries = _fs.readdirSync(path || ".", { withFileTypes: true });
                                const files = [];
                                const directories = [];
                                for (const dirent of entries) {
                                    const entry = typeof dirent === "string" ? dirent : dirent.name;
                                    if (entry === "." || entry === "..") {
                                        continue;
                                    }
                                    let stat;
                                    if (typeof dirent === "string" || dirent.isSymbolicLink()) {
                                        const name = combinePaths(path, entry);
                                        try {
                                            stat = statSync(name);
                                            if (!stat) {
                                                continue;
                                            }
                                        }
                                        catch (e) {
                                            continue;
                                        }
                                    }
                                    else {
                                        stat = dirent;
                                    }
                                    if (stat.isFile()) {
                                        files.push(entry);
                                    }
                                    else if (stat.isDirectory()) {
                                        directories.push(entry);
                                    }
                                }
                                files.sort();
                                directories.sort();
                                return { files, directories };
                            }
                            catch (e) {
                                return emptyFileSystemEntries;
                            }
                        }
                        function readDirectory(path, extensions, excludes, includes, depth) {
                            return matchFiles(path, extensions, excludes, includes, useCaseSensitiveFileNames, process.cwd(), depth, getAccessibleFileSystemEntries, realpath);
                        }
                        function fileSystemEntryExists(path, entryKind) {
                            const originalStackTraceLimit = Error.stackTraceLimit;
                            Error.stackTraceLimit = 0;
                            try {
                                const stat = statSync(path);
                                if (!stat) {
                                    return false;
                                }
                                switch (entryKind) {
                                    case 0 /* File */:
                                        return stat.isFile();
                                    case 1 /* Directory */:
                                        return stat.isDirectory();
                                    default:
                                        return false;
                                }
                            }
                            catch (e) {
                                return false;
                            }
                            finally {
                                Error.stackTraceLimit = originalStackTraceLimit;
                            }
                        }
                        function fileExists(path) {
                            return fileSystemEntryExists(path, 0 /* File */);
                        }
                        function directoryExists(path) {
                            return fileSystemEntryExists(path, 1 /* Directory */);
                        }
                        function getDirectories(path) {
                            return getAccessibleFileSystemEntries(path).directories.slice();
                        }
                        function fsRealPathHandlingLongPath(path) {
                            return path.length < 260 ? _fs.realpathSync.native(path) : _fs.realpathSync(path);
                        }
                        function realpath(path) {
                            try {
                                return fsRealpath(path);
                            }
                            catch (e) {
                                return path;
                            }
                        }
                        function getModifiedTime3(path) {
                            var _a2;
                            const originalStackTraceLimit = Error.stackTraceLimit;
                            Error.stackTraceLimit = 0;
                            try {
                                return (_a2 = statSync(path)) == null ? void 0 : _a2.mtime;
                            }
                            catch (e) {
                                return void 0;
                            }
                            finally {
                                Error.stackTraceLimit = originalStackTraceLimit;
                            }
                        }
                        function setModifiedTime(path, time) {
                            try {
                                _fs.utimesSync(path, time, time);
                            }
                            catch (e) {
                                return;
                            }
                        }
                        function deleteFile(path) {
                            try {
                                return _fs.unlinkSync(path);
                            }
                            catch (e) {
                                return;
                            }
                        }
                        function createSHA256Hash(data) {
                            const hash = _crypto.createHash("sha256");
                            hash.update(data);
                            return hash.digest("hex");
                        }
                    }