function onAddAssetAdd() {
    const nameBox = document.getElementById('addAssetName');
    const name = nameBox.value;

    // Warn on overwrite
    if ((gameSource.json.assets[name] !== undefined) &&
        ! window.confirm('There is already an asset called ' + name +
                         ' in your game. Replace it?')) {
        nameBox.focus();
        return;
    }

    // Warn on double add
    for (const key in gameSource.json.assets) {
        const value = gameSource.json.assets[key];
        if ((key[0] !== '_') && (value === addAssetFiles.selected)) {
            if (window.confirm('The asset ' + addAssetFiles.selected + ' is already in your game, called ' + key + '. Add the same asset again anyway?')) {
                // The user accepted...go along with it
                break;
            } else {
                return;
            }
        }
    }

    const url = addAssetFiles.selected;
    hideAddAssetDialog();

    if (url.endsWith('.png') ||
        url.endsWith('.tmx') ||
        url.endsWith('.mp3')) {
        // Handle raw assets
        
        const rawName = url;
        const type = document.getElementById('addAssetType').value;
        const jsonBase = rawName.replace(/\..*$/, '.' + type + '.json');
        const jsonAbsoluteURL = makeURLRelativeToGame(jsonBase);

        const json = {
            'url': rawName,
            'license': 'TODO'
        };
        
        if (type === 'map') {
            json.sprite_url_table = {'todo': 'todo'};
        }

        gameSource.json.assets[name] = jsonBase;

        // Save the new JSON file, and then reload the game
        serverWriteFile(jsonAbsoluteURL, 'utf8', WorkJSON.stringify(json, undefined, 4), function () {
            serverSaveGameJSON(function () { loadGameIntoIDE(window.gameURL, null, true); });
        });
    } else {
        gameSource.json.assets[name] = url;
    
        // Save and reload the game
        serverSaveGameJSON(function () { loadGameIntoIDE(window.gameURL, null, true); });
    }
}