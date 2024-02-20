function get_extension(filename) {
    const n = filename.length
    const i = filename.indexOf(".")
    if (i == -1 || i == n) return null
    return filename.split(".").pop()
}