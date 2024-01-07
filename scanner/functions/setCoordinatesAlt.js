function setCoordinatesAlt(coordinates, alt) {
    if (Array.isArray(coordinates)) {
        for (let i = 0, len = coordinates.length; i < len; i++) {
            setCoordinatesAlt(coordinates[i], alt);
        }
    } else {
        coordinates.z = alt;
    }
}