function trimEmptyLines(lineArray) {
    for (let i = 0; i < lineArray.length; ++i) {
        if (lineArray[i].search(/\S/) === -1) {
            lineArray[i] = '';
        }
    }
}