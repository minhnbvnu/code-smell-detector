function WebForm_SetElementWidth(element, width) {
    if (element && element.style) {
        element.style.width = width + "px";
    }
}