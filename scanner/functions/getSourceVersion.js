function getSourceVersion(path, readFileWithCache) {
                const hostSourceFile = sourceFilesCache.get(path);
                if (!hostSourceFile)
                    return void 0;
                if (hostSourceFile.version)
                    return hostSourceFile.version;
                const text = readFileWithCache(path);
                return text !== void 0 ? getSourceFileVersionAsHashFromText(compilerHost, text) : void 0;
            }