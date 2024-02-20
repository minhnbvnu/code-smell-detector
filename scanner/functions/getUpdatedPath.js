function getUpdatedPath(pathToUpdate) {
                if (getCanonicalFileName(pathToUpdate) === canonicalOldPath)
                    return newFileOrDirPath;
                const suffix = tryRemoveDirectoryPrefix(pathToUpdate, canonicalOldPath, getCanonicalFileName);
                return suffix === void 0 ? void 0 : newFileOrDirPath + "/" + suffix;
            }