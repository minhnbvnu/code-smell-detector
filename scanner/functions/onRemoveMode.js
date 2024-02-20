function onRemoveMode(modeName) {
        
    const index = gameSource.json.modes.indexOf(modeName);
    console.assert(index !== -1);
    gameSource.json.modes.splice(index, 1);

    if (modeName === gameSource.json.start_mode) {
        // Choose another mode
        if (gameSource.json.modes.length > 0) {
            gameSource.json.start_mode = gameSource.json.modes[0];
        } else {
            gameSource.json.start_mode = '';
        }
    }
    
    serverSaveGameJSON(function () { loadGameIntoIDE(window.gameURL, null, true); });
}