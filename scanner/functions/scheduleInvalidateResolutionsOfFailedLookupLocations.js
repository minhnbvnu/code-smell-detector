function scheduleInvalidateResolutionsOfFailedLookupLocations() {
                if (!host.setTimeout || !host.clearTimeout) {
                    return resolutionCache.invalidateResolutionsOfFailedLookupLocations();
                }
                const pending = clearInvalidateResolutionsOfFailedLookupLocations();
                writeLog(`Scheduling invalidateFailedLookup${pending ? ", Cancelled earlier one" : ""}`);
                timerToInvalidateFailedLookupResolutions = host.setTimeout(invalidateResolutionsOfFailedLookup, 250);
            }