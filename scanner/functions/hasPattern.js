function hasPattern(s, pattern) {
    const m = pattern.exec(s)
    return m != null && (m[1] || "").length % 2 === 0
}