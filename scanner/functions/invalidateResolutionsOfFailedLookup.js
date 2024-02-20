function invalidateResolutionsOfFailedLookup() {
                timerToInvalidateFailedLookupResolutions = void 0;
                if (resolutionCache.invalidateResolutionsOfFailedLookupLocations()) {
                    scheduleProgramUpdate();
                }
            }