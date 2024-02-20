function onImportModeImport() {
    const url = document.getElementById('importModeListOL').selected;
    gameSource.json.modes.push(url);
    serverSaveGameJSON(function () {
        hideImportModeDialog();
        loadGameIntoIDE(window.gameURL, undefined, true);
    });
}