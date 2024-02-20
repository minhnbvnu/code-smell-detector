function getTypeFlags(type) {
        // @ts-expect-error Since typescript 5.0, this is invalid, but uses 0 as the default value of TypeFlags.
        let flags = 0;
        for (const t of (0, tsutils_1.unionTypeParts)(type)) {
            flags |= t.flags;
        }
        return flags;
    }