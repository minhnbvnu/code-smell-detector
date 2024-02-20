function createPerModuleNameCache() {
                const directoryPathMap = /* @__PURE__ */ new Map();
                return { get, set };
                function get(directory) {
                    return directoryPathMap.get(toPath(directory, currentDirectory, getCanonicalFileName));
                }
                function set(directory, result) {
                    const path = toPath(directory, currentDirectory, getCanonicalFileName);
                    if (directoryPathMap.has(path)) {
                        return;
                    }
                    directoryPathMap.set(path, result);
                    const resolvedFileName = getResolvedFileName(result);
                    const commonPrefix = resolvedFileName && getCommonPrefix(path, resolvedFileName);
                    let current = path;
                    while (current !== commonPrefix) {
                        const parent2 = getDirectoryPath(current);
                        if (parent2 === current || directoryPathMap.has(parent2)) {
                            break;
                        }
                        directoryPathMap.set(parent2, result);
                        current = parent2;
                    }
                }
                function getCommonPrefix(directory, resolution) {
                    const resolutionDirectory = toPath(getDirectoryPath(resolution), currentDirectory, getCanonicalFileName);
                    let i = 0;
                    const limit = Math.min(directory.length, resolutionDirectory.length);
                    while (i < limit && directory.charCodeAt(i) === resolutionDirectory.charCodeAt(i)) {
                        i++;
                    }
                    if (i === directory.length && (resolutionDirectory.length === i || resolutionDirectory[i] === directorySeparator)) {
                        return directory;
                    }
                    const rootLength = getRootLength(directory);
                    if (i < rootLength) {
                        return void 0;
                    }
                    const sep = directory.lastIndexOf(directorySeparator, i - 1);
                    if (sep === -1) {
                        return void 0;
                    }
                    return directory.substr(0, Math.max(sep, rootLength));
                }
            }