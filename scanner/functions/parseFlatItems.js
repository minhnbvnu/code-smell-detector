function parseFlatItems(entrys) {
    for (const entry of entrys) {
        const paths = entry.entryName.split('/')
        paths.pop()
        if (paths.length == 0) {
            files.push(entry)
        } else {
            const parentPath = paths.join('/')
            if (folderMap[parentPath]) {
                folderMap[parentPath].children.push(entry)
            } else {
                folderMap[parentPath] = {
                    entryName: parentPath,
                    children: [entry]
                }
            }
        }
    }
}