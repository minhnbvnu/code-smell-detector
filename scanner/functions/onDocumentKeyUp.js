function onDocumentKeyUp(event) {
    if (((event.which || event.keyCode) === 82) && (event.ctrlKey || event.metaKey)) { // Ctrl+R
        // Intercept from browser to prevent page reload
        event.stopPropagation();
        event.preventDefault();
        return false;
    }
}