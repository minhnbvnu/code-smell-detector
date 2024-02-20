function WebForm_FireDefaultButton(event, target) {
    if (event.keyCode == 13) {
        var src = event.srcElement || event.target;
        if (src &&
            ((src.tagName.toLowerCase() == "input") &&
             (src.type.toLowerCase() == "submit" || src.type.toLowerCase() == "button")) ||
            ((src.tagName.toLowerCase() == "a") &&
             (src.href != null) && (src.href != "")) ||
            (src.tagName.toLowerCase() == "textarea")) {
            return true;
        }
        var defaultButton;
        if (__nonMSDOMBrowser) {
            defaultButton = document.getElementById(target);
        }
        else {
            defaultButton = document.all[target];
        }
        if (defaultButton) {
            return WebForm_SimulateClick(defaultButton, event);
        } 
    }
    return true;
}