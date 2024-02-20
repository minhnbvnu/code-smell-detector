function getLocalModuleSpecifier(moduleFileName, info, compilerOptions, host, importMode, { getAllowedEndingsInPreferredOrder: getAllowedEndingsInPrefererredOrder, relativePreference }, pathsOnly) {
            const { baseUrl, paths, rootDirs } = compilerOptions;
            if (pathsOnly && !paths) {
                return void 0;
            }
            const { sourceDirectory, getCanonicalFileName } = info;
            const allowedEndings = getAllowedEndingsInPrefererredOrder(importMode);
            const relativePath = rootDirs && tryGetModuleNameFromRootDirs(rootDirs, moduleFileName, sourceDirectory, getCanonicalFileName, allowedEndings, compilerOptions) || processEnding(ensurePathIsNonModuleName(getRelativePathFromDirectory(sourceDirectory, moduleFileName, getCanonicalFileName)), allowedEndings, compilerOptions);
            if (!baseUrl && !paths || relativePreference === 0 /* Relative */) {
                return pathsOnly ? void 0 : relativePath;
            }
            const baseDirectory = getNormalizedAbsolutePath(getPathsBasePath(compilerOptions, host) || baseUrl, host.getCurrentDirectory());
            const relativeToBaseUrl = getRelativePathIfInDirectory(moduleFileName, baseDirectory, getCanonicalFileName);
            if (!relativeToBaseUrl) {
                return pathsOnly ? void 0 : relativePath;
            }
            const fromPaths = paths && tryGetModuleNameFromPaths(relativeToBaseUrl, paths, allowedEndings, host, compilerOptions);
            if (pathsOnly) {
                return fromPaths;
            }
            const maybeNonRelative = fromPaths === void 0 && baseUrl !== void 0 ? processEnding(relativeToBaseUrl, allowedEndings, compilerOptions) : fromPaths;
            if (!maybeNonRelative) {
                return relativePath;
            }
            if (relativePreference === 1 /* NonRelative */ && !pathIsRelative(maybeNonRelative)) {
                return maybeNonRelative;
            }
            if (relativePreference === 3 /* ExternalNonRelative */ && !pathIsRelative(maybeNonRelative)) {
                const projectDirectory = compilerOptions.configFilePath ? toPath(getDirectoryPath(compilerOptions.configFilePath), host.getCurrentDirectory(), info.getCanonicalFileName) : info.getCanonicalFileName(host.getCurrentDirectory());
                const modulePath = toPath(moduleFileName, projectDirectory, getCanonicalFileName);
                const sourceIsInternal = startsWith(sourceDirectory, projectDirectory);
                const targetIsInternal = startsWith(modulePath, projectDirectory);
                if (sourceIsInternal && !targetIsInternal || !sourceIsInternal && targetIsInternal) {
                    return maybeNonRelative;
                }
                const nearestTargetPackageJson = getNearestAncestorDirectoryWithPackageJson(host, getDirectoryPath(modulePath));
                const nearestSourcePackageJson = getNearestAncestorDirectoryWithPackageJson(host, sourceDirectory);
                if (nearestSourcePackageJson !== nearestTargetPackageJson) {
                    return maybeNonRelative;
                }
                return relativePath;
            }
            return isPathRelativeToParent(maybeNonRelative) || countPathComponents(relativePath) < countPathComponents(maybeNonRelative) ? relativePath : maybeNonRelative;
        }