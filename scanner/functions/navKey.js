function navKey(keyChar, ctrlKey) {
    var result;
    if (keyChar.length > 1 || !this.editOnKeydown || ctrlKey) {
        result = keyChar; // return the mapped value
    }
    return result;
}