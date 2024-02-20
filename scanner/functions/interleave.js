function* interleave(seq, separator) {
        let first = true;
        for (const entry of seq) {
            if (first)
                first = false;
            else
                yield separator();
            yield entry;
        }
    }