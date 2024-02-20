function canInvalidatedFailedLookupResolutionWithAffectingLocation(resolution) {
                var _a2;
                return !!affectingPathChecks && ((_a2 = resolution.affectingLocations) == null ? void 0 : _a2.some((location) => affectingPathChecks.has(location)));
            }