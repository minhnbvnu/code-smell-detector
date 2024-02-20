function isBinFile(filePath, binField, basedir) {
    if (!binField) {
        return false
    }
    if (typeof binField === "string") {
        return simulateNodeResolutionAlgorithm(
            filePath,
            path.resolve(basedir, binField)
        )
    }
    return Object.keys(binField).some(key =>
        simulateNodeResolutionAlgorithm(
            filePath,
            path.resolve(basedir, binField[key])
        )
    )
}