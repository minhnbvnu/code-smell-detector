function existsCaseSensitive(filePath) {
    let dirPath = filePath

    while (dirPath !== "" && !ROOT.test(dirPath)) {
        const fileName = path.basename(dirPath)
        dirPath = path.dirname(dirPath)

        if (fs.readdirSync(dirPath).indexOf(fileName) === -1) {
            return false
        }
    }

    return true
}