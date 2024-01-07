function getMarkerRotation(symbol, prop = 'markerRotation') {
    const r = symbol[prop];
    if (!isNumber(r)) {
        return 0;
    }
    //to radian
    return -r * Math.PI / 180;
}