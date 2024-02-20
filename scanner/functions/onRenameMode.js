function onRenameMode(modeName) {    
    let newName;

    while (true) {
        newName = window.prompt("New name for mode '" + modeName + "'", modeName);
        if (! newName || newName === '') { return; }

        // Remove extension
        newName = newName.replace(/\.[^\.]+$/, '');
        
        // Check for conflict
        if (/^[^a-zA-Z_]/.test(newName) || /[^a-zA-Z0-9_]/.test(newName)) {
            window.alert("'" + newName + "' is not a legal mode name");
        } if (gameSource.json.modes.indexOf[newName]) {
            window.alert("There is already another mode named '" + newName + "'");
        } else {
            break;
        }
    }
    
    // Change the name in the gameSource.json
    {
        const index = gameSource.json.modes.indexOf(modeName);
        console.assert(index !== -1, 'Could not find mode ' + modeName);
        gameSource.json.modes[index] = newName;
    }
    
    if (modeName === gameSource.json.start_mode) {
        gameSource.json.start_mode = newName;
    }

    const oldURL = makeURLAbsolute(gameSource.jsonURL, modeName + '.pyxl');
    function deleteOldFile() { serverDeleteFile(oldURL); }

    
    function saveAndReloadProject() {
        console.log(gameSource.jsonURL);
        console.assert(gameSource.jsonURL);
        console.assert(window.gameURL);
        serverSaveGameJSON(function () {
            loadGameIntoIDE(window.gameURL, deleteOldFile, true);
        });
    }

    // Save mode under the new name, renaming the file
    const code = fileContents[oldURL].replace(new RegExp(`(^|\n)${modeName}[ \t]*(?=\n===|\n═══)`), '$1' + newName);
    serverWriteFile(urlToLocalWebPath(makeURLRelativeToGame(newName + '.pyxl')), 'utf8', code, saveAndReloadProject);
}