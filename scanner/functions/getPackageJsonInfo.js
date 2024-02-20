function getPackageJsonInfo(packageDirectory, onlyRecordFailures, state) {
            var _a2, _b, _c;
            const { host, traceEnabled } = state;
            const packageJsonPath = combinePaths(packageDirectory, "package.json");
            if (onlyRecordFailures) {
                state.failedLookupLocations.push(packageJsonPath);
                return void 0;
            }
            const existing = (_a2 = state.packageJsonInfoCache) == null ? void 0 : _a2.getPackageJsonInfo(packageJsonPath);
            if (existing !== void 0) {
                if (typeof existing !== "boolean") {
                    if (traceEnabled)
                        trace(host, Diagnostics.File_0_exists_according_to_earlier_cached_lookups, packageJsonPath);
                    state.affectingLocations.push(packageJsonPath);
                    return existing.packageDirectory === packageDirectory ? existing : { packageDirectory, contents: existing.contents };
                }
                else {
                    if (existing && traceEnabled)
                        trace(host, Diagnostics.File_0_does_not_exist_according_to_earlier_cached_lookups, packageJsonPath);
                    state.failedLookupLocations.push(packageJsonPath);
                    return void 0;
                }
            }
            const directoryExists = directoryProbablyExists(packageDirectory, host);
            if (directoryExists && host.fileExists(packageJsonPath)) {
                const packageJsonContent = readJson(packageJsonPath, host);
                if (traceEnabled) {
                    trace(host, Diagnostics.Found_package_json_at_0, packageJsonPath);
                }
                const result = { packageDirectory, contents: { packageJsonContent, versionPaths: void 0, resolvedEntrypoints: void 0 } };
                (_b = state.packageJsonInfoCache) == null ? void 0 : _b.setPackageJsonInfo(packageJsonPath, result);
                state.affectingLocations.push(packageJsonPath);
                return result;
            }
            else {
                if (directoryExists && traceEnabled) {
                    trace(host, Diagnostics.File_0_does_not_exist, packageJsonPath);
                }
                (_c = state.packageJsonInfoCache) == null ? void 0 : _c.setPackageJsonInfo(packageJsonPath, directoryExists);
                state.failedLookupLocations.push(packageJsonPath);
            }
        }