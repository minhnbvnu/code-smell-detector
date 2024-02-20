function forEachResolvedProjectReference(resolvedProjectReferences, cb) {
            return forEachProjectReference(
            /*projectReferences*/
            void 0, resolvedProjectReferences, (resolvedRef, parent2) => resolvedRef && cb(resolvedRef, parent2));
        }