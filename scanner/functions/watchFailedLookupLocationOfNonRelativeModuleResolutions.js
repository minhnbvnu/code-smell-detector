function watchFailedLookupLocationOfNonRelativeModuleResolutions(resolutions, name) {
                const program = resolutionHost.getCurrentProgram();
                if (!program || !program.getTypeChecker().tryFindAmbientModuleWithoutAugmentations(name)) {
                    resolutions.forEach(watchFailedLookupLocationOfResolution);
                }
                else {
                    resolutions.forEach((resolution) => watchAffectingLocationsOfResolution(resolution, 
                    /*addToResolutionWithOnlyAffectingLocations*/
                    true));
                }
            }