function parseNpmignore(basedir, filesFieldExists) {
    let filePath = path.join(basedir, ".npmignore")
    if (!exists(filePath)) {
        if (filesFieldExists) {
            return null
        }

        filePath = path.join(basedir, ".gitignore")
        if (!exists(filePath)) {
            return null
        }
    }

    const ig = ignore()
    ig.add(fs.readFileSync(filePath, "utf8"))
    return not(ig.createFilter())
}