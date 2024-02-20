function onImportDocImport() {
    const url = document.getElementById('importDocListOL').selected;
    gameSource.json.docs.push(url);
    hideImportDocDialog();
    serverSaveGameJSON(function () {
        loadGameIntoIDE(window.gameURL, undefined, true);
    });
}