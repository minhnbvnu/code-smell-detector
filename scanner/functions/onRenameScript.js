function onRenameScript(scriptURL) {
    const filename = urlFilename(scriptURL);

    let newName;

    while (true) {
        newName = window.prompt("New name for script '" + filename + "'", filename);
        if (! newName || newName === '') { return; }

        // Remove extension
        newName = newName.replace(/\.[^\.]+$/, '');
        
        // Mangle and add extension
        newName = newName.replace(/(^_|[^_0-9A-Za-z])/g, '') + '.pyxl';
        
        // Check for conflict
        if (gameSource.json.scripts.indexOf(newName) !== -1) {
            window.alert("There is already another script named '" + newName + "'");
        } else {
            break;
        }
    }
        
    // Change the name in the gameSource.json
    const index = gameSource.json.scripts.indexOf(filename);

    console.assert(index !== -1);
    gameSource.json.scripts.splice(index, 1, newName);

    // Callback sequence is:
    //
    // save script as the new name ->
    //   save the game.json ->
    //     reload the game ->
    //       delete the old file
    
    function deleteOldFile() {
        serverDeleteFile(makeURLAbsolute(gameSource.jsonURL, scriptURL));
    }

    function saveAndReloadProject() {
        console.assert(gameSource.jsonURL);
        serverSaveGameJSON(function () {
            loadGameIntoIDE(window.gameURL, deleteOldFile, true);
        });
    }
    
    serverWriteFile(urlToLocalWebPath(makeURLRelativeToGame(newName)), 'utf8', fileContents[scriptURL], saveAndReloadProject);
}