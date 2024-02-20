function getDuplicateFolders(oldArray, newArray) {
    let duplicateFolders = []

    for (let i = 0; i < oldArray.length; i++) {
        for (let j = 0; j < newArray.length; j++) {
            if (oldArray[i] === newArray[j]) {
                duplicateFolders.push(oldArray[i])
            }
        }
    }

    return duplicateFolders
}