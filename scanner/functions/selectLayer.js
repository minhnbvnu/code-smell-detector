function selectLayer(layer) {
    if (sketch.version.sketch < 45) {
        layer.select_byExpendingSelection(true, true);
        if (!layer.selectedInLayerList()) {
            deselectAllChildAndSelf(layer, true);
            layer.select_byExpendingSelection(true, true);
        }
    } else {
        layer.select_byExtendingSelection(true, true);
        if (!layer.isSelected()) {
            deselectAllChildAndSelf(layer, true);
            layer.select_byExtendingSelection(true, true);
        }
    }
}