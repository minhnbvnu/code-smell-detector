function getEnginesNode(filename) {
    const info = getPackageJson(filename)
    return getSemverRange(info && info.engines && info.engines.node)
}