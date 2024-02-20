function getPathsRelativeToRootDirs(path, rootDirs, getCanonicalFileName) {
            return mapDefined(rootDirs, (rootDir) => {
                const relativePath = getRelativePathIfInDirectory(path, rootDir, getCanonicalFileName);
                return relativePath !== void 0 && isPathRelativeToParent(relativePath) ? void 0 : relativePath;
            });
        }