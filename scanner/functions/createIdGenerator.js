function createIdGenerator() {
        const key = (NEXT_KEY += 1);
        ID_CACHE.set(key, 0);
        return () => {
            var _a;
            const current = (_a = ID_CACHE.get(key)) !== null && _a !== void 0 ? _a : 0;
            const next = current + 1;
            ID_CACHE.set(key, next);
            return next;
        };
    }