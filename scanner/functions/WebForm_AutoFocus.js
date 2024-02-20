function WebForm_AutoFocus(focusId) {
    var targetControl;
    if (__nonMSDOMBrowser) {
        targetControl = document.getElementById(focusId);
    }
    else {
        targetControl = document.all[focusId];
    }
    var focused = targetControl;
    if (targetControl && (!WebForm_CanFocus(targetControl)) ) {
        focused = WebForm_FindFirstFocusableChild(targetControl);
    }
    if (focused) {
        try {
            focused.focus();
            if (__nonMSDOMBrowser) {
                focused.scrollIntoView(false);
            }
            if (window.__smartNav) {
                window.__smartNav.ae = focused.id;
            }
        }
        catch (e) {
        }
    }
}