function canInvalidateFailedLookupResolution(resolution) {
                var _a2;
                if (canInvalidatedFailedLookupResolutionWithAffectingLocation(resolution))
                    return true;
                if (!failedLookupChecks && !startsWithPathChecks && !isInDirectoryChecks)
                    return false;
                return (_a2 = resolution.failedLookupLocations) == null ? void 0 : _a2.some((location) => isInvalidatedFailedLookup(resolutionHost.toPath(location)));
            }