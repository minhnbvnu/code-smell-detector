function removeResolutionsOfFileFromCache(cache, filePath, getResolutionWithResolvedFileName) {
                const resolutions = cache.get(filePath);
                if (resolutions) {
                    resolutions.forEach((resolution) => stopWatchFailedLookupLocationOfResolution(resolution, filePath, getResolutionWithResolvedFileName));
                    cache.delete(filePath);
                }
            }