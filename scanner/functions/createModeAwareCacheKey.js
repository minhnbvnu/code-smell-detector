function createModeAwareCacheKey(specifier, mode) {
            return mode === void 0 ? specifier : `${mode}|${specifier}`;
        }