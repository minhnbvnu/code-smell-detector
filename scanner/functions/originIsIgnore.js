function originIsIgnore(origin) {
            return !!(origin && origin.kind & 256 /* Ignore */);
        }