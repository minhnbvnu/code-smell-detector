function onRenameConstant(constantName) {
    let newName;
    while (true) {
        newName = window.prompt("New name for constant '" + constantName + "'", constantName);
        if (! newName || newName === '') { return; }
        
        // Mangle
        newName = newName.replace(/(^_|[^_0-9A-Za-z])/g, '');

        // Check for conflict
        if (gameSource.json.assets[newName]) {
            window.alert("There is already an asset named '" + newName + "'");
        } else if (gameSource.json.constants[newName]) {
            window.alert("There is already another constant named '" + newName + "'");
        } else {

            // Perform the rename
            gameSource.json.constants[newName] = gameSource.json.constants[constantName];
            delete gameSource.json.constants[constantName];
            
            serverSaveGameJSON(function () {
                loadGameIntoIDE(window.gameURL, function () {
                    // Select the renamed asset
                    onProjectSelect(document.getElementById('projectConstant_' + newName), 'constant', newName);
                }, true);
            });
            
            return;
        } // if ok name
    } // while true
}