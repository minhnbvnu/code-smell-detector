function parseWhiteList(files) {
    if (!files || !Array.isArray(files)) {
        return null
    }

    const ig = ignore()
    const igN = ignore()
    let hasN = false

    for (const file of files) {
        if (typeof file === "string" && file) {
            const body = file.replace(SLASH_AT_BEGIN_AND_END, "")
            if (file.startsWith("!")) {
                igN.add(`${body}`)
                igN.add(`${body}/**`)
                hasN = true
            } else {
                ig.add(`/${body}`)
                ig.add(`/${body}/**`)
            }
        }
    }

    return hasN
        ? or(ig.createFilter(), not(igN.createFilter()))
        : ig.createFilter()
}