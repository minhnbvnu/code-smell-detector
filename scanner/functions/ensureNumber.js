function ensureNumber(value, default_) {
    if (typeof value === "number") {
        return value;
    }
    if (typeof default_ === "number") {
        return default_;
    }
    return -1;
}