function simulateNodeResolutionAlgorithm(filePath, binField) {
    const possibilities = [filePath]
    let newFilePath = filePath.replace(/\.js$/u, "")
    possibilities.push(newFilePath)
    newFilePath = newFilePath.replace(/[/\\]index$/u, "")
    possibilities.push(newFilePath)
    return possibilities.includes(binField)
}