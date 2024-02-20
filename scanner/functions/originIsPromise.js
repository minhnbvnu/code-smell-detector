function originIsPromise(origin) {
            return !!(origin.kind & 8 /* Promise */);
        }