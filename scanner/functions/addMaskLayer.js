function addMaskLayer(html) {
    var maskLayer = $G("J_maskLayer");
    dialog.buttons[0].setDisabled(true);
    maskLayer.className = "maskLayer";
    maskLayer.innerHTML = html;
}