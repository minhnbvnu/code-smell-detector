function getPathUpdater(oldFileOrDirPath, newFileOrDirPath, getCanonicalFileName, sourceMapper) {
            const canonicalOldPath = getCanonicalFileName(oldFileOrDirPath);
            return (path) => {
                const originalPath = sourceMapper && sourceMapper.tryGetSourcePosition({ fileName: path, pos: 0 });
                const updatedPath = getUpdatedPath(originalPath ? originalPath.fileName : path);
                return originalPath ? updatedPath === void 0 ? void 0 : makeCorrespondingRelativeChange(originalPath.fileName, updatedPath, path, getCanonicalFileName) : updatedPath;
            };
            function getUpdatedPath(pathToUpdate) {
                if (getCanonicalFileName(pathToUpdate) === canonicalOldPath)
                    return newFileOrDirPath;
                const suffix = tryRemoveDirectoryPrefix(pathToUpdate, canonicalOldPath, getCanonicalFileName);
                return suffix === void 0 ? void 0 : newFileOrDirPath + "/" + suffix;
            }
        }