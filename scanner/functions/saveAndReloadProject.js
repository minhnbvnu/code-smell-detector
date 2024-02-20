function saveAndReloadProject() {
        console.assert(gameSource.jsonURL);
        serverSaveGameJSON(function () {
            loadGameIntoIDE(window.gameURL, deleteOldFile, true);
        });
    }