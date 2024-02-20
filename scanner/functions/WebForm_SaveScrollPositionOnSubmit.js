function WebForm_SaveScrollPositionOnSubmit() {
    theForm.__SCROLLPOSITIONX.value = WebForm_GetScrollX();
    theForm.__SCROLLPOSITIONY.value = WebForm_GetScrollY();
    if ((typeof(this.oldOnSubmit) != "undefined") && (this.oldOnSubmit != null)) {
        return this.oldOnSubmit();
    }
    return true;
}