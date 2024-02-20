function originIsTypeOnlyAlias(origin) {
            return !!(origin && origin.kind & 64 /* TypeOnlyAlias */);
        }