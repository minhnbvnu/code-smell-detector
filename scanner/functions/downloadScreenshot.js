function downloadScreenshot() {
    // Screenshot
    download(emulatorScreen.toDataURL(), makeDateFilename() + '.png');
}