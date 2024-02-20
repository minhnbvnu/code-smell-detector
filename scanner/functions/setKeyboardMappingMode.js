function setKeyboardMappingMode(type) {
    keyboardMappingMode = type;
    document.getElementById(type + 'KeyboardRadio').checked = '1';
    localStorage.setItem('keyboardMappingMode', type);
}