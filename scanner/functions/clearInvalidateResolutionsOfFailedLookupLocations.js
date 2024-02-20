function clearInvalidateResolutionsOfFailedLookupLocations() {
                if (!timerToInvalidateFailedLookupResolutions)
                    return false;
                host.clearTimeout(timerToInvalidateFailedLookupResolutions);
                timerToInvalidateFailedLookupResolutions = void 0;
                return true;
            }