function getVersionPathsOfPackageJsonInfo(packageJsonInfo, state) {
            if (packageJsonInfo.contents.versionPaths === void 0) {
                packageJsonInfo.contents.versionPaths = readPackageJsonTypesVersionPaths(packageJsonInfo.contents.packageJsonContent, state) || false;
            }
            return packageJsonInfo.contents.versionPaths || void 0;
        }