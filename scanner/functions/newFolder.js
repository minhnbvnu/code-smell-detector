function newFolder(name) {
    let folders = getObject("folders", [])

    if (!folders.includes(name)) {
        folders.push(name)
    }

    return folders
}