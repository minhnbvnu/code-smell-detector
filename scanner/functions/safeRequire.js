function safeRequire(...moduleNames) {
    for (const moduleName of moduleNames) {
        try {
            return require(moduleName)
        } catch (_err) {
            // Ignore.
        }
    }
    return null
}