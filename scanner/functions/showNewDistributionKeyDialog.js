function showNewDistributionKeyDialog(parentKey) {

    let key;
    while (true) {
        key = window.prompt("Key for new measure in '" + parentKey + "'", '');
        
        // Cancel
        if (! key || key === '') { return; }
        
        // Mangle
        key = key.replace(/(^_|[^_0-9A-Za-z])/g, '');

        // Check for conflict
        if (nestedGet(gameSource.json.constants, parentKey + '.' + key, true, true) !== undefined) {
            window.alert("There is already a measure named '" + parentKey + '.' + key + "'. Choose a different name.");
        } else {
            // Add
            const value = 0.5;
            nestedGet(gameSource.constants, parentKey)[key] = value;
            nestedGet(gameSource.json.constants, parentKey, false, true).value[key] = {type: 'number', value: value};

            // Reload
            serverSaveGameJSON(function () {
                loadGameIntoIDE(window.gameURL, function () {
                    // Select the same parent
                    onProjectSelect(document.getElementById('projectConstant_' + parentKey), 'constant', parentKey);
                }, true);
            });
            return;
        }
    }

}