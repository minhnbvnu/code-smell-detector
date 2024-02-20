function tryGetModuleNameFromExports(options, targetFilePath, packageDirectory, packageName, exports, conditions, mode = 0 /* Exact */) {
            if (typeof exports === "string") {
                const pathOrPattern = getNormalizedAbsolutePath(combinePaths(packageDirectory, exports), 
                /*currentDirectory*/
                void 0);
                const extensionSwappedTarget = hasTSFileExtension(targetFilePath) ? removeFileExtension(targetFilePath) + tryGetJSExtensionForFile(targetFilePath, options) : void 0;
                switch (mode) {
                    case 0 /* Exact */:
                        if (comparePaths(targetFilePath, pathOrPattern) === 0 /* EqualTo */ || extensionSwappedTarget && comparePaths(extensionSwappedTarget, pathOrPattern) === 0 /* EqualTo */) {
                            return { moduleFileToTry: packageName };
                        }
                        break;
                    case 1 /* Directory */:
                        if (containsPath(pathOrPattern, targetFilePath)) {
                            const fragment = getRelativePathFromDirectory(pathOrPattern, targetFilePath, 
                            /*ignoreCase*/
                            false);
                            return { moduleFileToTry: getNormalizedAbsolutePath(combinePaths(combinePaths(packageName, exports), fragment), 
                                /*currentDirectory*/
                                void 0) };
                        }
                        break;
                    case 2 /* Pattern */:
                        const starPos = pathOrPattern.indexOf("*");
                        const leadingSlice = pathOrPattern.slice(0, starPos);
                        const trailingSlice = pathOrPattern.slice(starPos + 1);
                        if (startsWith(targetFilePath, leadingSlice) && endsWith(targetFilePath, trailingSlice)) {
                            const starReplacement = targetFilePath.slice(leadingSlice.length, targetFilePath.length - trailingSlice.length);
                            return { moduleFileToTry: packageName.replace("*", starReplacement) };
                        }
                        if (extensionSwappedTarget && startsWith(extensionSwappedTarget, leadingSlice) && endsWith(extensionSwappedTarget, trailingSlice)) {
                            const starReplacement = extensionSwappedTarget.slice(leadingSlice.length, extensionSwappedTarget.length - trailingSlice.length);
                            return { moduleFileToTry: packageName.replace("*", starReplacement) };
                        }
                        break;
                }
            }
            else if (Array.isArray(exports)) {
                return forEach(exports, (e) => tryGetModuleNameFromExports(options, targetFilePath, packageDirectory, packageName, e, conditions));
            }
            else if (typeof exports === "object" && exports !== null) {
                if (allKeysStartWithDot(exports)) {
                    return forEach(getOwnKeys(exports), (k) => {
                        const subPackageName = getNormalizedAbsolutePath(combinePaths(packageName, k), 
                        /*currentDirectory*/
                        void 0);
                        const mode2 = endsWith(k, "/") ? 1 /* Directory */ : stringContains(k, "*") ? 2 /* Pattern */ : 0 /* Exact */;
                        return tryGetModuleNameFromExports(options, targetFilePath, packageDirectory, subPackageName, exports[k], conditions, mode2);
                    });
                }
                else {
                    for (const key of getOwnKeys(exports)) {
                        if (key === "default" || conditions.indexOf(key) >= 0 || isApplicableVersionedTypesKey(conditions, key)) {
                            const subTarget = exports[key];
                            const result = tryGetModuleNameFromExports(options, targetFilePath, packageDirectory, packageName, subTarget, conditions);
                            if (result) {
                                return result;
                            }
                        }
                    }
                }
            }
            return void 0;
        }