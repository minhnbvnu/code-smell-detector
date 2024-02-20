function onCloneAssetCreate() {
    // The order of operations in this function is convoluted because
    // it must asynchronously read the asset JSON, and then may need
    // to read the asset data, before it can write.
    
    hideCloneAssetDialog();
    
    const add = document.getElementById('cloneAssetKeepOriginal').checked;

    const srcAssetName = document.getElementById('cloneAssetSrcName').innerHTML;
    const dstAssetName = add ? document.getElementById('cloneAssetNewName').value.replace(/(^_|[^_0-9A-Za-z])/g, '') : srcAssetName;

    const cloneData = document.getElementById('cloneAssetCloneData').checked;

    // Absolute
    const srcAbsoluteUrl = document.getElementById('cloneAssetSrcUrl').innerHTML;

    // Relative to the game
    const dstUrl = document.getElementById('cloneAssetDstUrl').innerHTML.replace(/^.*\//, '');

    // Accumulated after the LoadManager is created
    const filesToWrite = [];

    const cloneLoadManager = new LoadManager({
        callback: function () {
            serverWriteFiles(
                filesToWrite,
                
                function () {
                    // Modify game JSON to reference the new file
                    gameSource.json.assets[dstAssetName] = dstUrl;
                    
                    // Save and reload game JSON
                    serverSaveGameJSON(function () {
                        loadGameIntoIDE(window.gameURL, function () {
                            // Select the renamed asset
                            onProjectSelect(document.getElementById('projectAsset_' + dstAssetName), 'asset', gameSource.assets[dstAssetName]);
                        }, true);
                    });
                }); // write files
        } // load manager callback
    }); // load manager

    // Clone the asset JSON
    cloneLoadManager.fetch(
        srcAbsoluteUrl,
        'text',
        null,
        function (assetJson) {
            const dstAssetUrl = assetJson.url.replace(/^.*\//, '');
            
            // Change the url in the file to be the new relative url for the json
            assetJson.url = dstAssetUrl;

            const dstAbsoluteUrl = getGamePath() + dstUrl;
            
            filesToWrite.push({
                filename: dstAbsoluteUrl,
                contents: assetJson,
                encoding: 'utf8'});

            if (cloneData) {
                let srcAssetAbsoluteUrl = assetJson.url;
                if (srcAssetAbsoluteUrl.indexOf(':') === -1) {
                    // This src asset was specified is relative to the
                    // asset json, so copy over its path prefix
                    srcAssetAbsoluteUrl = srcAbsoluteUrl.replace(/\/[^\/]*$/, '/') + srcAssetAbsoluteUrl;
                }
                
                const dstAssetAbsoluteUrl = getGamePath() + dstAssetUrl;

                // Copy the underlying asset
                cloneLoadManager.fetch(
                    srcAssetAbsoluteUrl,
                    'arraybuffer',
                    null,
                    function (assetData) {
                        filesToWrite.push({
                            filename: dstAssetAbsoluteUrl,
                            contents: assetData,
                            encoding: (typeof assetData === 'string' ? 'utf8' : 'binary')
                        });
                    });
            } // if clone data
        }); // fetch first

    // Start the loading, which will trigger the saving
    cloneLoadManager.end();
}