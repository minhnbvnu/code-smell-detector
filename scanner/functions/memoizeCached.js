function memoizeCached(callback, cache) {
            return (...args) => {
                let value = cache.get(args);
                if (value === void 0 && !cache.has(args)) {
                    value = callback(...args);
                    cache.set(args, value);
                }
                return value;
            };
        }