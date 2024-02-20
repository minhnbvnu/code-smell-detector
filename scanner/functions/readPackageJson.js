function readPackageJson(dir) {
    const filePath = path.join(dir, "package.json")
    try {
        const text = fs.readFileSync(filePath, "utf8")
        const data = JSON.parse(text)

        if (typeof data === "object" && data !== null) {
            data.filePath = filePath
            return data
        }
    } catch (_err) {
        // do nothing.
    }

    return null
}