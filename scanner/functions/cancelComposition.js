function cancelComposition() {
        ignoreFocusEvents = true;
        text.blur();
        text.focus();
        ignoreFocusEvents = false;
    }