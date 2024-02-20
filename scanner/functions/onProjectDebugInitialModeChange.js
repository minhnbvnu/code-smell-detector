function onProjectDebugInitialModeChange(newStartModeName) {
    if (! gameSource.debug.json) { gameSource.debug.json = {}; }
    
    if (newStartModeName === '') {
        // Remove
        gameSource.debug.json.start_mode_enabled = false;
    } else {
        gameSource.debug.json.start_mode = newStartModeName;
        gameSource.debug.json.start_mode_enabled = true;
    }
    
    serverSaveDebugJSON(function () { loadGameIntoIDE(window.gameURL, null, true); });
}