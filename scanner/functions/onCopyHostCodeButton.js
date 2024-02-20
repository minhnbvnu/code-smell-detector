function onCopyHostCodeButton() {
    copyToClipboard(QRuntime.HOST_CODE);
    showPopupMessage("Copied host code to clipboard.");
    emulatorKeyboardInput.focus({preventScroll:true});
}