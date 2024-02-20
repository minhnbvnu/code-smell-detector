function WebForm_GetElementById(elementId) {
    if (document.getElementById) {
        return document.getElementById(elementId);
    }
    else if (document.all) {
        return document.all[elementId];
    }
    else return null;
}