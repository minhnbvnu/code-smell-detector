function getFilePath(isModule, id, options) {
    try {
        return resolve.sync(id, options)
    } catch (_err) {
        if (isModule) {
            return null
        }
        return path.resolve(options.basedir, id)
    }
}