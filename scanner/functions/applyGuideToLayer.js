function applyGuideToLayer(guideSetting, layer) {
    if (guideSetting.horizontalRulerData) {
        layer.horizontalRulerData().setGuides(guideSetting.horizontalRulerData);
    }
    if (guideSetting.verticalRulerData) {
        layer.verticalRulerData().setGuides(guideSetting.verticalRulerData);
    }
}