function updateKeyboard(e, val) {
        if (e.keyCode == 40 || e.keyCode == 83) {
            updateKeyChange('down', val);
        }
        if (e.keyCode == 38 || e.keyCode == 87) {
            updateKeyChange('up', val);
        }
        if (e.keyCode == 39 || e.keyCode == 68) {
            updateKeyChange('right', val);
        }
        if (e.keyCode == 37 || e.keyCode == 65) {
            updateKeyChange('left', val);
        }
        if (e.keyCode == 32) {
            updateKeyChange('space', val);
        }
        if (e.keyCode == 17) {
            updateKeyChange('ctrl', val);
        }
        if (e.keyCode == 13) {
            updateKeyChange('enter', val);
        }
        if (e.keyCode == 27) {
            updateKeyChange('esc', val);
        }
        // 0..9, a-z
        if (e.keyCode >= 48 && e.keyCode <= 90) {
            var keyStr = String.fromCharCode(e.keyCode);
            updateKeyChange(keyStr.toLowerCase(), val);
        }
    }