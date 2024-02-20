function WebForm_SetElementHeight(element, height) {
    if (element && element.style) {
        element.style.height = height + "px";
    }
}