function updateCurrentKeys(e, keydown) {
    var keyChar = this.getKeyChar(e);

    // prevent TAB from moving focus off the canvas element
    switch (keyChar) {
        case 'TAB':
        case 'TABSHIFT':
        case 'Tab':
            e.preventDefault();
    }

    fixCurrentKeys.call(this, keyChar, keydown);

    return keyChar;
}