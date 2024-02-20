function* mapIterator(iter, mapFn) {
            for (const x of iter) {
                yield mapFn(x);
            }
        }