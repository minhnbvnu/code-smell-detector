function toStringArray(x) {
    if (Array.isArray(x)) {
        return x.map(String)
    }
    return []
}