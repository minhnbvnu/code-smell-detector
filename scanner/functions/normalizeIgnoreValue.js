function normalizeIgnoreValue(x) {
        if (typeof x === "string") {
            return BigInt(x.slice(0, -1));
        }
        return x;
    }