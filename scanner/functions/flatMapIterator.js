function* flatMapIterator(iter, mapfn) {
            for (const x of iter) {
                const iter2 = mapfn(x);
                if (!iter2)
                    continue;
                yield* iter2;
            }
        }