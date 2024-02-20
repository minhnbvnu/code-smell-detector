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