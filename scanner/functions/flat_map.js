function* flat_map(iterable, fn) {
        let i = 0;
        for (const item of iterable) {
            yield* fn(item, i++);
        }
    }