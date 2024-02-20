function loadNodeModuleFromDirectory(extensions, candidate, onlyRecordFailures, state, considerPackageJson = true) {
            const packageInfo = considerPackageJson ? getPackageJsonInfo(candidate, onlyRecordFailures, state) : void 0;
            const packageJsonContent = packageInfo && packageInfo.contents.packageJsonContent;
            const versionPaths = packageInfo && getVersionPathsOfPackageJsonInfo(packageInfo, state);
            return withPackageId(packageInfo, loadNodeModuleFromDirectoryWorker(extensions, candidate, onlyRecordFailures, state, packageJsonContent, versionPaths));
        }