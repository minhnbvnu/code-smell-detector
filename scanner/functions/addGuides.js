function addGuides(artboard, orientation, values) {
    var rulerData;
    if (orientation == 0) {
        rulerData = artboard.horizontalRulerData();
    } else {
        rulerData = artboard.verticalRulerData();
    }
    rulerData.setGuides(values);
}