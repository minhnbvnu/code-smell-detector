function invalidateResolutionsOfFailedLookupLocations() {
                var _a2;
                let invalidated = false;
                if (affectingPathChecksForFile) {
                    (_a2 = resolutionHost.getCurrentProgram()) == null ? void 0 : _a2.getSourceFiles().forEach((f) => {
                        if (some(f.packageJsonLocations, (location) => affectingPathChecksForFile.has(location))) {
                            (filesWithInvalidatedResolutions != null ? filesWithInvalidatedResolutions : filesWithInvalidatedResolutions = /* @__PURE__ */ new Set()).add(f.path);
                            invalidated = true;
                        }
                    });
                    affectingPathChecksForFile = void 0;
                }
                if (!failedLookupChecks && !startsWithPathChecks && !isInDirectoryChecks && !affectingPathChecks) {
                    return invalidated;
                }
                invalidated = invalidateResolutions(resolutionsWithFailedLookups, canInvalidateFailedLookupResolution) || invalidated;
                const packageJsonMap = moduleResolutionCache.getPackageJsonInfoCache().getInternalMap();
                if (packageJsonMap && (failedLookupChecks || startsWithPathChecks || isInDirectoryChecks)) {
                    packageJsonMap.forEach((_value, path) => isInvalidatedFailedLookup(path) ? packageJsonMap.delete(path) : void 0);
                }
                failedLookupChecks = void 0;
                startsWithPathChecks = void 0;
                isInDirectoryChecks = void 0;
                invalidated = invalidateResolutions(resolutionsWithOnlyAffectingLocations, canInvalidatedFailedLookupResolutionWithAffectingLocation) || invalidated;
                affectingPathChecks = void 0;
                return invalidated;
            }