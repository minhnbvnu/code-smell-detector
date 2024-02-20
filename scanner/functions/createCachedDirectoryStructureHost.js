function createCachedDirectoryStructureHost(host, currentDirectory, useCaseSensitiveFileNames) {
            if (!host.getDirectories || !host.readDirectory) {
                return void 0;
            }
            const cachedReadDirectoryResult = /* @__PURE__ */ new Map();
            const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            return {
                useCaseSensitiveFileNames,
                fileExists,
                readFile: (path, encoding) => host.readFile(path, encoding),
                directoryExists: host.directoryExists && directoryExists,
                getDirectories,
                readDirectory,
                createDirectory: host.createDirectory && createDirectory,
                writeFile: host.writeFile && writeFile2,
                addOrDeleteFileOrDirectory,
                addOrDeleteFile,
                clearCache,
                realpath: host.realpath && realpath
            };
            function toPath3(fileName) {
                return toPath(fileName, currentDirectory, getCanonicalFileName);
            }
            function getCachedFileSystemEntries(rootDirPath) {
                return cachedReadDirectoryResult.get(ensureTrailingDirectorySeparator(rootDirPath));
            }
            function getCachedFileSystemEntriesForBaseDir(path) {
                const entries = getCachedFileSystemEntries(getDirectoryPath(path));
                if (!entries) {
                    return entries;
                }
                if (!entries.sortedAndCanonicalizedFiles) {
                    entries.sortedAndCanonicalizedFiles = entries.files.map(getCanonicalFileName).sort();
                    entries.sortedAndCanonicalizedDirectories = entries.directories.map(getCanonicalFileName).sort();
                }
                return entries;
            }
            function getBaseNameOfFileName(fileName) {
                return getBaseFileName(normalizePath(fileName));
            }
            function createCachedFileSystemEntries(rootDir, rootDirPath) {
                var _a2;
                if (!host.realpath || ensureTrailingDirectorySeparator(toPath3(host.realpath(rootDir))) === rootDirPath) {
                    const resultFromHost = {
                        files: map(host.readDirectory(rootDir, 
                        /*extensions*/
                        void 0, 
                        /*exclude*/
                        void 0, 
                        /*include*/
                        ["*.*"]), getBaseNameOfFileName) || [],
                        directories: host.getDirectories(rootDir) || []
                    };
                    cachedReadDirectoryResult.set(ensureTrailingDirectorySeparator(rootDirPath), resultFromHost);
                    return resultFromHost;
                }
                if ((_a2 = host.directoryExists) == null ? void 0 : _a2.call(host, rootDir)) {
                    cachedReadDirectoryResult.set(rootDirPath, false);
                    return false;
                }
                return void 0;
            }
            function tryReadDirectory2(rootDir, rootDirPath) {
                rootDirPath = ensureTrailingDirectorySeparator(rootDirPath);
                const cachedResult = getCachedFileSystemEntries(rootDirPath);
                if (cachedResult) {
                    return cachedResult;
                }
                try {
                    return createCachedFileSystemEntries(rootDir, rootDirPath);
                }
                catch (_e) {
                    Debug.assert(!cachedReadDirectoryResult.has(ensureTrailingDirectorySeparator(rootDirPath)));
                    return void 0;
                }
            }
            function hasEntry(entries, name) {
                const index = binarySearch(entries, name, identity, compareStringsCaseSensitive);
                return index >= 0;
            }
            function writeFile2(fileName, data, writeByteOrderMark) {
                const path = toPath3(fileName);
                const result = getCachedFileSystemEntriesForBaseDir(path);
                if (result) {
                    updateFilesOfFileSystemEntry(result, getBaseNameOfFileName(fileName), 
                    /*fileExists*/
                    true);
                }
                return host.writeFile(fileName, data, writeByteOrderMark);
            }
            function fileExists(fileName) {
                const path = toPath3(fileName);
                const result = getCachedFileSystemEntriesForBaseDir(path);
                return result && hasEntry(result.sortedAndCanonicalizedFiles, getCanonicalFileName(getBaseNameOfFileName(fileName))) || host.fileExists(fileName);
            }
            function directoryExists(dirPath) {
                const path = toPath3(dirPath);
                return cachedReadDirectoryResult.has(ensureTrailingDirectorySeparator(path)) || host.directoryExists(dirPath);
            }
            function createDirectory(dirPath) {
                const path = toPath3(dirPath);
                const result = getCachedFileSystemEntriesForBaseDir(path);
                if (result) {
                    const baseName = getBaseNameOfFileName(dirPath);
                    const canonicalizedBaseName = getCanonicalFileName(baseName);
                    const canonicalizedDirectories = result.sortedAndCanonicalizedDirectories;
                    if (insertSorted(canonicalizedDirectories, canonicalizedBaseName, compareStringsCaseSensitive)) {
                        result.directories.push(baseName);
                    }
                }
                host.createDirectory(dirPath);
            }
            function getDirectories(rootDir) {
                const rootDirPath = toPath3(rootDir);
                const result = tryReadDirectory2(rootDir, rootDirPath);
                if (result) {
                    return result.directories.slice();
                }
                return host.getDirectories(rootDir);
            }
            function readDirectory(rootDir, extensions, excludes, includes, depth) {
                const rootDirPath = toPath3(rootDir);
                const rootResult = tryReadDirectory2(rootDir, rootDirPath);
                let rootSymLinkResult;
                if (rootResult !== void 0) {
                    return matchFiles(rootDir, extensions, excludes, includes, useCaseSensitiveFileNames, currentDirectory, depth, getFileSystemEntries, realpath);
                }
                return host.readDirectory(rootDir, extensions, excludes, includes, depth);
                function getFileSystemEntries(dir) {
                    const path = toPath3(dir);
                    if (path === rootDirPath) {
                        return rootResult || getFileSystemEntriesFromHost(dir, path);
                    }
                    const result = tryReadDirectory2(dir, path);
                    return result !== void 0 ? result || getFileSystemEntriesFromHost(dir, path) : emptyFileSystemEntries;
                }
                function getFileSystemEntriesFromHost(dir, path) {
                    if (rootSymLinkResult && path === rootDirPath)
                        return rootSymLinkResult;
                    const result = {
                        files: map(host.readDirectory(dir, 
                        /*extensions*/
                        void 0, 
                        /*exclude*/
                        void 0, 
                        /*include*/
                        ["*.*"]), getBaseNameOfFileName) || emptyArray,
                        directories: host.getDirectories(dir) || emptyArray
                    };
                    if (path === rootDirPath)
                        rootSymLinkResult = result;
                    return result;
                }
            }
            function realpath(s) {
                return host.realpath ? host.realpath(s) : s;
            }
            function addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath) {
                const existingResult = getCachedFileSystemEntries(fileOrDirectoryPath);
                if (existingResult !== void 0) {
                    clearCache();
                    return void 0;
                }
                const parentResult = getCachedFileSystemEntriesForBaseDir(fileOrDirectoryPath);
                if (!parentResult) {
                    return void 0;
                }
                if (!host.directoryExists) {
                    clearCache();
                    return void 0;
                }
                const baseName = getBaseNameOfFileName(fileOrDirectory);
                const fsQueryResult = {
                    fileExists: host.fileExists(fileOrDirectoryPath),
                    directoryExists: host.directoryExists(fileOrDirectoryPath)
                };
                if (fsQueryResult.directoryExists || hasEntry(parentResult.sortedAndCanonicalizedDirectories, getCanonicalFileName(baseName))) {
                    clearCache();
                }
                else {
                    updateFilesOfFileSystemEntry(parentResult, baseName, fsQueryResult.fileExists);
                }
                return fsQueryResult;
            }
            function addOrDeleteFile(fileName, filePath, eventKind) {
                if (eventKind === 1 /* Changed */) {
                    return;
                }
                const parentResult = getCachedFileSystemEntriesForBaseDir(filePath);
                if (parentResult) {
                    updateFilesOfFileSystemEntry(parentResult, getBaseNameOfFileName(fileName), eventKind === 0 /* Created */);
                }
            }
            function updateFilesOfFileSystemEntry(parentResult, baseName, fileExists2) {
                const canonicalizedFiles = parentResult.sortedAndCanonicalizedFiles;
                const canonicalizedBaseName = getCanonicalFileName(baseName);
                if (fileExists2) {
                    if (insertSorted(canonicalizedFiles, canonicalizedBaseName, compareStringsCaseSensitive)) {
                        parentResult.files.push(baseName);
                    }
                }
                else {
                    const sortedIndex = binarySearch(canonicalizedFiles, canonicalizedBaseName, identity, compareStringsCaseSensitive);
                    if (sortedIndex >= 0) {
                        canonicalizedFiles.splice(sortedIndex, 1);
                        const unsortedIndex = parentResult.files.findIndex((entry) => getCanonicalFileName(entry) === canonicalizedBaseName);
                        parentResult.files.splice(unsortedIndex, 1);
                    }
                }
            }
            function clearCache() {
                cachedReadDirectoryResult.clear();
            }
        }