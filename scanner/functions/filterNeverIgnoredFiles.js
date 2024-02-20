function filterNeverIgnoredFiles(p) {
    const basedir = path.dirname(p.filePath)
    const mainFilePath =
        typeof p.main === "string" ? path.join(basedir, p.main) : null

    return filePath =>
        path.join(basedir, filePath) !== mainFilePath &&
        filePath !== "package.json" &&
        !NEVER_IGNORED.test(path.relative(basedir, filePath))
}