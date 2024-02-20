function loadModuleFromSpecificNodeModulesDirectory(extensions, moduleName, nodeModulesDirectory, nodeModulesDirectoryExists, state, cache, redirectedReference) {
            var _a2, _b, _c;
            const candidate = normalizePath(combinePaths(nodeModulesDirectory, moduleName));
            const { packageName, rest } = parsePackageName(moduleName);
            const packageDirectory = combinePaths(nodeModulesDirectory, packageName);
            let rootPackageInfo;
            let packageInfo = getPackageJsonInfo(candidate, !nodeModulesDirectoryExists, state);
            if (rest !== "" && packageInfo && (!(state.features & 8 /* Exports */) || !hasProperty((_b = (_a2 = rootPackageInfo = getPackageJsonInfo(packageDirectory, !nodeModulesDirectoryExists, state)) == null ? void 0 : _a2.contents.packageJsonContent) != null ? _b : emptyArray, "exports"))) {
                const fromFile = loadModuleFromFile(extensions, candidate, !nodeModulesDirectoryExists, state);
                if (fromFile) {
                    return noPackageId(fromFile);
                }
                const fromDirectory = loadNodeModuleFromDirectoryWorker(extensions, candidate, !nodeModulesDirectoryExists, state, packageInfo.contents.packageJsonContent, getVersionPathsOfPackageJsonInfo(packageInfo, state));
                return withPackageId(packageInfo, fromDirectory);
            }
            const loader = (extensions2, candidate2, onlyRecordFailures, state2) => {
                let pathAndExtension = loadModuleFromFile(extensions2, candidate2, onlyRecordFailures, state2) || loadNodeModuleFromDirectoryWorker(extensions2, candidate2, onlyRecordFailures, state2, packageInfo && packageInfo.contents.packageJsonContent, packageInfo && getVersionPathsOfPackageJsonInfo(packageInfo, state2));
                if (!pathAndExtension && packageInfo && (packageInfo.contents.packageJsonContent.exports === void 0 || packageInfo.contents.packageJsonContent.exports === null) && state2.features & 32 /* EsmMode */) {
                    pathAndExtension = loadModuleFromFile(extensions2, combinePaths(candidate2, "index.js"), onlyRecordFailures, state2);
                }
                return withPackageId(packageInfo, pathAndExtension);
            };
            if (rest !== "") {
                packageInfo = rootPackageInfo != null ? rootPackageInfo : getPackageJsonInfo(packageDirectory, !nodeModulesDirectoryExists, state);
            }
            if (packageInfo && packageInfo.contents.packageJsonContent.exports && state.features & 8 /* Exports */) {
                return (_c = loadModuleFromExports(packageInfo, extensions, combinePaths(".", rest), state, cache, redirectedReference)) == null ? void 0 : _c.value;
            }
            const versionPaths = rest !== "" && packageInfo ? getVersionPathsOfPackageJsonInfo(packageInfo, state) : void 0;
            if (versionPaths) {
                if (state.traceEnabled) {
                    trace(state.host, Diagnostics.package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2, versionPaths.version, version, rest);
                }
                const packageDirectoryExists = nodeModulesDirectoryExists && directoryProbablyExists(packageDirectory, state.host);
                const fromPaths = tryLoadModuleUsingPaths(extensions, rest, packageDirectory, versionPaths.paths, 
                /*pathPatterns*/
                void 0, loader, !packageDirectoryExists, state);
                if (fromPaths) {
                    return fromPaths.value;
                }
            }
            return loader(extensions, candidate, !nodeModulesDirectoryExists, state);
        }