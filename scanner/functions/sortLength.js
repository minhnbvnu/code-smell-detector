function sortLength(a, b) {
        return a.length !== b.length ? b.length - a.length : a === b ? 0 : a < b ? -1 : 1;
    }