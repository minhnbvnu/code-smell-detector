function selectReverse(layer) {
    if (layer.isSelected()) {
        layer.select_byExpandingSelection(false, true);
    }
    else {
        layer.select_byExpandingSelection(true, true);
    }
}