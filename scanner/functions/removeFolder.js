function removeFolder(name) {
    let folders = getObject("folders", [])
    let i = 0
    for (const folder of folders) {
        if (folder === name) {
            folders.splice(i, 1)
        }
        i += 1
    }
    return folders
}