function getUnderlyingCacheKey(specifier, mode) {
                const result = createModeAwareCacheKey(specifier, mode);
                memoizedReverseKeys.set(result, [specifier, mode]);
                return result;
            }