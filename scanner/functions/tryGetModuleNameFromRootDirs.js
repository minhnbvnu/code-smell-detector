function tryGetModuleNameFromRootDirs(rootDirs, moduleFileName, sourceDirectory, getCanonicalFileName, allowedEndings, compilerOptions) {
            const normalizedTargetPaths = getPathsRelativeToRootDirs(moduleFileName, rootDirs, getCanonicalFileName);
            if (normalizedTargetPaths === void 0) {
                return void 0;
            }
            const normalizedSourcePaths = getPathsRelativeToRootDirs(sourceDirectory, rootDirs, getCanonicalFileName);
            const relativePaths = flatMap(normalizedSourcePaths, (sourcePath) => {
                return map(normalizedTargetPaths, (targetPath) => ensurePathIsNonModuleName(getRelativePathFromDirectory(sourcePath, targetPath, getCanonicalFileName)));
            });
            const shortest = min(relativePaths, compareNumberOfDirectorySeparators);
            if (!shortest) {
                return void 0;
            }
            return processEnding(shortest, allowedEndings, compilerOptions);
        }