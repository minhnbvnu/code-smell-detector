function WebForm_SetElementX(element, x) {
    if (element && element.style) {
        element.style.left = x + "px";
    }
}