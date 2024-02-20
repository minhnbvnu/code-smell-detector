function* combinations(seq, r) {
        const n = seq.length;
        if (r > n)
            return;
        const indices = (0, array_1.range)(r);
        yield indices.map((i) => seq[i]);
        while (true) {
            let k;
            for (const i of reverse((0, array_1.range)(r))) {
                if (indices[i] != i + n - r) {
                    k = i;
                    break;
                }
            }
            if (k == null)
                return;
            indices[k] += 1;
            for (const j of (0, array_1.range)(k + 1, r)) {
                indices[j] = indices[j - 1] + 1;
            }
            yield indices.map((i) => seq[i]);
        }
    }