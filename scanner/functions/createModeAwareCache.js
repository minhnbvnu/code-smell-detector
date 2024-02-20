function createModeAwareCache() {
            const underlying = /* @__PURE__ */ new Map();
            const memoizedReverseKeys = /* @__PURE__ */ new Map();
            const cache = {
                get(specifier, mode) {
                    return underlying.get(getUnderlyingCacheKey(specifier, mode));
                },
                set(specifier, mode, value) {
                    underlying.set(getUnderlyingCacheKey(specifier, mode), value);
                    return cache;
                },
                delete(specifier, mode) {
                    underlying.delete(getUnderlyingCacheKey(specifier, mode));
                    return cache;
                },
                has(specifier, mode) {
                    return underlying.has(getUnderlyingCacheKey(specifier, mode));
                },
                forEach(cb) {
                    return underlying.forEach((elem, key) => {
                        const [specifier, mode] = memoizedReverseKeys.get(key);
                        return cb(elem, specifier, mode);
                    });
                },
                size() {
                    return underlying.size;
                }
            };
            return cache;
            function getUnderlyingCacheKey(specifier, mode) {
                const result = createModeAwareCacheKey(specifier, mode);
                memoizedReverseKeys.set(result, [specifier, mode]);
                return result;
            }
        }