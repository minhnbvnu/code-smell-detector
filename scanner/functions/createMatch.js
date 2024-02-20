function createMatch(includePatterns, excludePatterns) {
    const include = includePatterns.map(pattern => new Minimatch(pattern))
    const exclude = excludePatterns.map(pattern => new Minimatch(pattern))

    return filePath =>
        include.some(m => m.match(filePath)) &&
        !exclude.some(m => m.match(filePath))
}