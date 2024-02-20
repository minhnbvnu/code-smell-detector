function getOrCreateSourceFileLike(fileName) {
                const path = toPath3(fileName);
                const fileFromCache = sourceFileLike.get(path);
                if (fileFromCache !== void 0)
                    return fileFromCache ? fileFromCache : void 0;
                if (!host.readFile || host.fileExists && !host.fileExists(path)) {
                    sourceFileLike.set(path, false);
                    return void 0;
                }
                const text = host.readFile(path);
                const file = text ? createSourceFileLike(text) : false;
                sourceFileLike.set(path, file);
                return file ? file : void 0;
            }