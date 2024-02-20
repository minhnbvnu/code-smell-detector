function matrixCallback(callback) {
    const result = [];
    const x = 10;
    const y = 5;
    for (let xIndex = 0; xIndex < x; xIndex += 1) {
        for (let yIndex = 0; yIndex < y; yIndex += 1) {
            if (xIndex === 0 || xIndex === x - 1 || yIndex === 0 || yIndex === y - 1) {
                result.push(callback(xIndex, yIndex, x, y));
            }
        }
    }
    return result;
}