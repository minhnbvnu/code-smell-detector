function onImportScriptImport() {
    const url = document.getElementById('importScriptListOL').selected;
    gameSource.json.scripts.push(url);
    hideImportScriptDialog();
    serverSaveGameJSON(function () {
        loadGameIntoIDE(window.gameURL, undefined, true);
    });
}