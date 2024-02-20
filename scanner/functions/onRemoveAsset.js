function onRemoveAsset(key) {
    if (confirm('Remove asset \'' + key + '\' from this project?')) {
        delete gameSource.json.assets[key];
        serverSaveGameJSON(function () {
            loadGameIntoIDE(window.gameURL, null, true);
        });
    }
}