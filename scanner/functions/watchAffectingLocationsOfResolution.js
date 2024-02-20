function watchAffectingLocationsOfResolution(resolution, addToResolutionsWithOnlyAffectingLocations) {
                Debug.assert(!!resolution.refCount);
                const { affectingLocations } = resolution;
                if (!(affectingLocations == null ? void 0 : affectingLocations.length))
                    return;
                if (addToResolutionsWithOnlyAffectingLocations)
                    resolutionsWithOnlyAffectingLocations.add(resolution);
                for (const affectingLocation of affectingLocations) {
                    createFileWatcherOfAffectingLocation(affectingLocation, 
                    /*forResolution*/
                    true);
                }
            }