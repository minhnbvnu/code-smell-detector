function WebForm_RestoreScrollPosition() {
    if (__nonMSDOMBrowser) {
        window.scrollTo(theForm.elements['__SCROLLPOSITIONX'].value, theForm.elements['__SCROLLPOSITIONY'].value);
    }
    else {
        window.scrollTo(theForm.__SCROLLPOSITIONX.value, theForm.__SCROLLPOSITIONY.value);
    }
    if ((typeof(theForm.oldOnLoad) != "undefined") && (theForm.oldOnLoad != null)) {
        return theForm.oldOnLoad();
    }
    return true;
}