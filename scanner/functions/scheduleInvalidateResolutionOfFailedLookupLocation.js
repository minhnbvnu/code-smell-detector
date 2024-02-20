function scheduleInvalidateResolutionOfFailedLookupLocation(fileOrDirectoryPath, isCreatingWatchedDirectory) {
                if (isCreatingWatchedDirectory) {
                    (isInDirectoryChecks || (isInDirectoryChecks = /* @__PURE__ */ new Set())).add(fileOrDirectoryPath);
                }
                else {
                    const updatedPath = removeIgnoredPath(fileOrDirectoryPath);
                    if (!updatedPath)
                        return false;
                    fileOrDirectoryPath = updatedPath;
                    if (resolutionHost.fileIsOpen(fileOrDirectoryPath)) {
                        return false;
                    }
                    const dirOfFileOrDirectory = getDirectoryPath(fileOrDirectoryPath);
                    if (isNodeModulesAtTypesDirectory(fileOrDirectoryPath) || isNodeModulesDirectory(fileOrDirectoryPath) || isNodeModulesAtTypesDirectory(dirOfFileOrDirectory) || isNodeModulesDirectory(dirOfFileOrDirectory)) {
                        (failedLookupChecks || (failedLookupChecks = /* @__PURE__ */ new Set())).add(fileOrDirectoryPath);
                        (startsWithPathChecks || (startsWithPathChecks = /* @__PURE__ */ new Set())).add(fileOrDirectoryPath);
                    }
                    else {
                        if (!isPathWithDefaultFailedLookupExtension(fileOrDirectoryPath) && !customFailedLookupPaths.has(fileOrDirectoryPath)) {
                            return false;
                        }
                        if (isEmittedFileOfProgram(resolutionHost.getCurrentProgram(), fileOrDirectoryPath)) {
                            return false;
                        }
                        (failedLookupChecks || (failedLookupChecks = /* @__PURE__ */ new Set())).add(fileOrDirectoryPath);
                        const packagePath = parseNodeModuleFromPath(fileOrDirectoryPath);
                        if (packagePath)
                            (startsWithPathChecks || (startsWithPathChecks = /* @__PURE__ */ new Set())).add(packagePath);
                    }
                }
                resolutionHost.scheduleInvalidateResolutionsOfFailedLookupLocations();
            }