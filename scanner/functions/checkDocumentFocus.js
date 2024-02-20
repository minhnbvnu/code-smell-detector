function checkDocumentFocus() {
    if (!isMobile) {
        if (prevHasFocus != document.hasFocus()) {
            changedFocus(document.hasFocus())
        }
        prevHasFocus = document.hasFocus()
    }
}