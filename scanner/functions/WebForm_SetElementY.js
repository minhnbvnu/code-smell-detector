function WebForm_SetElementY(element, y) {
    if (element && element.style) {
        element.style.top = y + "px";
    }
}