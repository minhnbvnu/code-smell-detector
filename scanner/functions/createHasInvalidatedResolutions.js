function createHasInvalidatedResolutions(customHasInvalidatedResolutions) {
                invalidateResolutionsOfFailedLookupLocations();
                const collected = filesWithInvalidatedResolutions;
                filesWithInvalidatedResolutions = void 0;
                return (path) => customHasInvalidatedResolutions(path) || !!(collected == null ? void 0 : collected.has(path)) || isFileWithInvalidatedNonRelativeUnresolvedImports(path);
            }