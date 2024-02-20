function addToReturnedOrThrown(dest, others, all, segments) {
        for (let i = 0; i < segments.length; ++i) {
            const segment = segments[i];
            dest.push(segment);
            if (!others.includes(segment)) {
                all.push(segment);
            }
        }
    }