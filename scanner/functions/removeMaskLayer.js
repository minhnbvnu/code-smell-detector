function removeMaskLayer() {
    var maskLayer = $G("J_maskLayer");
    maskLayer.className = "maskLayerNull";
    maskLayer.innerHTML = "";
    dialog.buttons[0].setDisabled(false);
}