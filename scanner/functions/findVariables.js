function findVariables(str) {
    // thanks chatgpt
    const regex = /{{(.+?)}}/g
    const matches = new Set()
    let match
    while ((match = regex.exec(str))) {
        matches.add(match[1])
    }
    return Array.from(matches)
}