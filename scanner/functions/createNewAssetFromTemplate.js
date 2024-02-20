function createNewAssetFromTemplate(assetName, gamePath, fileName, type, dataType, templateJSONParameters, assetData) {
    const templateName = type;
    let assetJSONText;
    
    // Create from the template and write to disk
    // Load the template JSON and PNG
    const templateLoadManager = new LoadManager({
        callback: function() {
            // Copy the template
            serverWriteFiles(
                [{filename: gamePath + fileName + '.' + type + '.json', contents: assetJSONText, encoding: 'utf8'},
                 {filename: gamePath + fileName + '.' + dataType, contents: assetData, encoding: (typeof assetData === 'string' ? 'utf8' : 'binary')}],
                function () {
                    // Save the game
                    serverSaveGameJSON(function () {
                        // Reload the game
                        loadGameIntoIDE(window.gameURL, function () {
                            // Select the new asset
                            onProjectSelect(document.getElementById('projectAsset_' + assetName), 'asset', gameSource.assets[assetName]);
                        }, true);
                    });
                });
        },
        jsonParser:  'permissive',
        forceReload: false
    });

    // Load the data
    templateLoadManager.fetch(makeURLAbsolute('', 'quad://console/templates/' + templateName + '.' + type + '.json'), 'text', null, function (templateJSONString) {
        assetJSONText = templateJSONString;
        for (let key in templateJSONParameters) {
            const value = templateJSONParameters[key];
            assetJSONText = assetJSONText.replace('"TODO: ' + key + '"', JSON.stringify(value));
        }
    });

    if (assetData === undefined) {
        // Load the data from disk
        templateLoadManager.fetch(makeURLAbsolute('', 'quad://console/templates/' + templateName + '.' + dataType), 'arraybuffer', null, function (data) {
            assetData = data;
        });
    }

    templateLoadManager.end();
}