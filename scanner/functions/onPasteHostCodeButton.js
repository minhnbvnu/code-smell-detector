function onPasteHostCodeButton() {
    if (QRuntime.$paste_host_code_callback) {
        navigator.clipboard.readText().then(function (text) {
            // If the Text is a URL, extract the host code 
            if (text.startsWith('http') && text.indexOf('host=') !== -1) {
                text = text.replace(/^.*host=([^&]*).*/, '$1') 
            }
            
            // See _NewHost.pyxl for where this is defined
            QRuntime.$paste_host_code_callback(text);
        });
    }
    emulatorKeyboardInput.focus({preventScroll:true});
}