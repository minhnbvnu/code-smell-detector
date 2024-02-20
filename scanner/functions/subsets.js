function* subsets(seq) {
        for (const k of (0, array_1.range)(seq.length + 1)) {
            yield* combinations(seq, k);
        }
    }