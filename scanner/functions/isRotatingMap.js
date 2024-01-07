function isRotatingMap(map) {
    if (!map._domMouseDownView) {
        return true;
    }
    const view = map.getView(), mouseDownView = map._domMouseDownView;
    return (view.bearing !== mouseDownView.bearing || view.pitch !== mouseDownView.pitch);
}