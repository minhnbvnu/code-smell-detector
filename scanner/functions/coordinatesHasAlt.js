function coordinatesHasAlt(coordinates, tempAlts) {
    if (tempAlts.length) {
        return;
    }
    if (Array.isArray(coordinates)) {
        for (let i = 0, len = coordinates.length; i < len; i++) {
            coordinatesHasAlt(coordinates[i], tempAlts);
        }
    } else if (isNumber(coordinates.z)) {
        tempAlts.push(coordinates.z);
    }
}