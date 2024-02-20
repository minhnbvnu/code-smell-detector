function getDefaultVersion(filename) {
    const info = getPackageJson(filename)
    const nodeVersion = info && info.engines && info.engines.node

    return semver.validRange(nodeVersion) || DEFAULT_VERSION
}