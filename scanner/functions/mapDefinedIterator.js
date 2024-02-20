function* mapDefinedIterator(iter, mapFn) {
            for (const x of iter) {
                const value = mapFn(x);
                if (value !== void 0) {
                    yield value;
                }
            }
        }