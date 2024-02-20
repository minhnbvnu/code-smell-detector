function fetchAssetTable(callback) {
    let gamePath = getGamePath();
    const assetListURL = location.origin + getQuadPath() + 'console/_assets.json?gamePath=' + gamePath;
    
    // Fetch the asset list
    LoadManager.fetchOne({forceReload: true}, assetListURL, 'json', null, function (json) {
        // Strip the path to the current game off assets in the same dir
        // or subdirectory of it. We do not do this on the server side
        // because we may later allow developers to have their own asset directories
        // separate from games, and the existing protocol allows that.
        if (gamePath.length > 0 && gamePath[0] === '/') {
            gamePath = gamePath.substring(1);
        }
        
        for (const key in json) {
            const array = json[key];
            for (let i = 0; i < array.length; ++i) {
                const url = array[i];
                if (url.startsWith(gamePath)) {
                    array[i] = url.substring(gamePath.length);
                }
            }
        }

        callback(json);
    });
}