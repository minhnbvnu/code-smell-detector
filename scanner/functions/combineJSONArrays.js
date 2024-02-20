function combineJSONArrays(array1, array2) {
    try {
        if (array1.length === 0) return array2
        else if (array2.length === 0) return array1

        // Combine the arrays into one
        const combinedArray = array1.concat(array2)

        // Stringify the combined array
        const combinedJSON = combinedArray

        return combinedJSON
    } catch (error) {
        // Handle parsing errors
        return null
    }
}