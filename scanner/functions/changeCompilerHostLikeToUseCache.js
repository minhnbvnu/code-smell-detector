function changeCompilerHostLikeToUseCache(host, toPath3, getSourceFile) {
            const originalReadFile = host.readFile;
            const originalFileExists = host.fileExists;
            const originalDirectoryExists = host.directoryExists;
            const originalCreateDirectory = host.createDirectory;
            const originalWriteFile = host.writeFile;
            const readFileCache = /* @__PURE__ */ new Map();
            const fileExistsCache = /* @__PURE__ */ new Map();
            const directoryExistsCache = /* @__PURE__ */ new Map();
            const sourceFileCache = /* @__PURE__ */ new Map();
            const readFileWithCache = (fileName) => {
                const key = toPath3(fileName);
                const value = readFileCache.get(key);
                if (value !== void 0)
                    return value !== false ? value : void 0;
                return setReadFileCache(key, fileName);
            };
            const setReadFileCache = (key, fileName) => {
                const newValue = originalReadFile.call(host, fileName);
                readFileCache.set(key, newValue !== void 0 ? newValue : false);
                return newValue;
            };
            host.readFile = (fileName) => {
                const key = toPath3(fileName);
                const value = readFileCache.get(key);
                if (value !== void 0)
                    return value !== false ? value : void 0;
                if (!fileExtensionIs(fileName, ".json" /* Json */) && !isBuildInfoFile(fileName)) {
                    return originalReadFile.call(host, fileName);
                }
                return setReadFileCache(key, fileName);
            };
            const getSourceFileWithCache = getSourceFile ? (fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
                const key = toPath3(fileName);
                const impliedNodeFormat = typeof languageVersionOrOptions === "object" ? languageVersionOrOptions.impliedNodeFormat : void 0;
                const forImpliedNodeFormat = sourceFileCache.get(impliedNodeFormat);
                const value = forImpliedNodeFormat == null ? void 0 : forImpliedNodeFormat.get(key);
                if (value)
                    return value;
                const sourceFile = getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile);
                if (sourceFile && (isDeclarationFileName(fileName) || fileExtensionIs(fileName, ".json" /* Json */))) {
                    sourceFileCache.set(impliedNodeFormat, (forImpliedNodeFormat || /* @__PURE__ */ new Map()).set(key, sourceFile));
                }
                return sourceFile;
            } : void 0;
            host.fileExists = (fileName) => {
                const key = toPath3(fileName);
                const value = fileExistsCache.get(key);
                if (value !== void 0)
                    return value;
                const newValue = originalFileExists.call(host, fileName);
                fileExistsCache.set(key, !!newValue);
                return newValue;
            };
            if (originalWriteFile) {
                host.writeFile = (fileName, data, ...rest) => {
                    const key = toPath3(fileName);
                    fileExistsCache.delete(key);
                    const value = readFileCache.get(key);
                    if (value !== void 0 && value !== data) {
                        readFileCache.delete(key);
                        sourceFileCache.forEach((map2) => map2.delete(key));
                    }
                    else if (getSourceFileWithCache) {
                        sourceFileCache.forEach((map2) => {
                            const sourceFile = map2.get(key);
                            if (sourceFile && sourceFile.text !== data) {
                                map2.delete(key);
                            }
                        });
                    }
                    originalWriteFile.call(host, fileName, data, ...rest);
                };
            }
            if (originalDirectoryExists) {
                host.directoryExists = (directory) => {
                    const key = toPath3(directory);
                    const value = directoryExistsCache.get(key);
                    if (value !== void 0)
                        return value;
                    const newValue = originalDirectoryExists.call(host, directory);
                    directoryExistsCache.set(key, !!newValue);
                    return newValue;
                };
                if (originalCreateDirectory) {
                    host.createDirectory = (directory) => {
                        const key = toPath3(directory);
                        directoryExistsCache.delete(key);
                        originalCreateDirectory.call(host, directory);
                    };
                }
            }
            return {
                originalReadFile,
                originalFileExists,
                originalDirectoryExists,
                originalCreateDirectory,
                originalWriteFile,
                getSourceFileWithCache,
                readFileWithCache
            };
        }