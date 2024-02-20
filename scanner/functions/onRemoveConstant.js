function onRemoveConstant(key) {
    if (confirm('Remove constant \'' + key + '\' from this project?')) {
        delete gameSource.json.constants[key];
        serverSaveGameJSON(function () {
            loadGameIntoIDE(window.gameURL, null, true);
        });
    }
}