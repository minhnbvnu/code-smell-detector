function onDebugScreenshotTagOverrideChange(checkbox) {
    const control = document.getElementById('debugScreenshotTag');
    control.disabled = ! checkbox.checked;
    if (gameSource.debug === undefined) { gameSource.debug = {}; }
    if (gameSource.debug.json === undefined) { gameSource.debug.json = {}; }
    gameSource.debug.json.screenshot_tag_enabled = checkbox.checked;
    onProjectMetadataChanged();
}