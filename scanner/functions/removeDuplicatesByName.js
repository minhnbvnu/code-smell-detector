function removeDuplicatesByName(array1, array2) {
    // created by ChatGPT
    // Create a set to store unique names from array1
    const namesSet = new Set(array1.map(obj => obj))

    // Filter array2 to remove duplicates by checking if obj.name is in namesSet
    const filteredArray2 = array2.filter(obj => !namesSet.has(obj))

    return filteredArray2
}