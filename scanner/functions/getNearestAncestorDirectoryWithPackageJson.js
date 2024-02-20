function getNearestAncestorDirectoryWithPackageJson(host, fileName) {
            if (host.getNearestAncestorDirectoryWithPackageJson) {
                return host.getNearestAncestorDirectoryWithPackageJson(fileName);
            }
            return !!forEachAncestorDirectory(fileName, (directory) => {
                return host.fileExists(combinePaths(directory, "package.json")) ? true : void 0;
            });
        }