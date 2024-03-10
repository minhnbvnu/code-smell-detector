function tryDirectoryWithPackageJson(packageRootIndex) {
                var _a2, _b;
                const packageRootPath = path.substring(0, packageRootIndex);
                const packageJsonPath = combinePaths(packageRootPath, "package.json");
                let moduleFileToTry = path;
                let maybeBlockedByTypesVersions = false;
                const cachedPackageJson = (_b = (_a2 = host.getPackageJsonInfoCache) == null ? void 0 : _a2.call(host)) == null ? void 0 : _b.getPackageJsonInfo(packageJsonPath);
                if (typeof cachedPackageJson === "object" || cachedPackageJson === void 0 && host.fileExists(packageJsonPath)) {
                    const packageJsonContent = (cachedPackageJson == null ? void 0 : cachedPackageJson.contents.packageJsonContent) || JSON.parse(host.readFile(packageJsonPath));
                    const importMode = overrideMode || importingSourceFile.impliedNodeFormat;
                    if (getResolvePackageJsonExports(options)) {
                        const nodeModulesDirectoryName2 = packageRootPath.substring(parts.topLevelPackageNameIndex + 1);
                        const packageName2 = getPackageNameFromTypesPackageName(nodeModulesDirectoryName2);
                        const conditions = getConditions(options, importMode === 99 /* ESNext */);
                        const fromExports = packageJsonContent.exports ? tryGetModuleNameFromExports(options, path, packageRootPath, packageName2, packageJsonContent.exports, conditions) : void 0;
                        if (fromExports) {
                            const withJsExtension = !hasTSFileExtension(fromExports.moduleFileToTry) ? fromExports : { moduleFileToTry: removeFileExtension(fromExports.moduleFileToTry) + tryGetJSExtensionForFile(fromExports.moduleFileToTry, options) };
                            return { ...withJsExtension, verbatimFromExports: true };
                        }
                        if (packageJsonContent.exports) {
                            return { moduleFileToTry: path, blockedByExports: true };
                        }
                    }
                    const versionPaths = packageJsonContent.typesVersions ? getPackageJsonTypesVersionsPaths(packageJsonContent.typesVersions) : void 0;
                    if (versionPaths) {
                        const subModuleName = path.slice(packageRootPath.length + 1);
                        const fromPaths = tryGetModuleNameFromPaths(subModuleName, versionPaths.paths, allowedEndings, host, options);
                        if (fromPaths === void 0) {
                            maybeBlockedByTypesVersions = true;
                        }
                        else {
                            moduleFileToTry = combinePaths(packageRootPath, fromPaths);
                        }
                    }
                    const mainFileRelative = packageJsonContent.typings || packageJsonContent.types || packageJsonContent.main || "index.js";
                    if (isString(mainFileRelative) && !(maybeBlockedByTypesVersions && matchPatternOrExact(tryParsePatterns(versionPaths.paths), mainFileRelative))) {
                        const mainExportFile = toPath(mainFileRelative, packageRootPath, getCanonicalFileName);
                        if (removeFileExtension(mainExportFile) === removeFileExtension(getCanonicalFileName(moduleFileToTry))) {
                            return { packageRootPath, moduleFileToTry };
                        }
                    }
                }
                else {
                    const fileName = getCanonicalFileName(moduleFileToTry.substring(parts.packageRootIndex + 1));
                    if (fileName === "index.d.ts" || fileName === "index.js" || fileName === "index.ts" || fileName === "index.tsx") {
                        return { moduleFileToTry, packageRootPath };
                    }
                }
                return { moduleFileToTry };
            }