function setupPictureUI(menu, pictureInfos, plane, updateDistanceCallback, view, min, max) {
    const orientedImageGUI = menu.gui.addFolder('Oriented Image');
    orientedImageGUI.add(pictureInfos, 'distance', min, max).name('Distance').onChange(function distanceChanged(value) {
        pictureInfos.distance = value;
        updateDistanceCallback();
        view.notifyChange();
    });
    orientedImageGUI.add(pictureInfos, 'opacity', 0, 1).name('Opacity').onChange(function opacityChanged(value) {
        plane.material.opacity = value;
        view.notifyChange();
    });
}