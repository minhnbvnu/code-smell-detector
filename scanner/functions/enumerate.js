function* enumerate(seq) {
        let i = 0;
        for (const item of seq) {
            yield [item, i++];
        }
    }