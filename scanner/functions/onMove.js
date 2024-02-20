function onMove() {
    let coordinates = map.getView().getCenter();
    popup.setPosition(coordinates);
}