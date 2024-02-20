function onProjectInitialModeChange(newStartModeName) {
    gameSource.json.start_mode = newStartModeName;
    serverSaveGameJSON(function () { loadGameIntoIDE(window.gameURL, null, true); });
}