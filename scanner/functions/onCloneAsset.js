function onCloneAsset(assetName) {
    document.getElementById('cloneAssetDialog').classList.remove('hidden');

    document.getElementById('cloneAssetSrcName').innerHTML = assetName;

    // Remove any leading slash, which is part of the URL but will
    // confuse a user by looking like an absolute filesystem path
    const gamePath = getGamePath().replace(/^\//, '');
    const srcUrl = gameSource.json.assets[assetName];
    const srcAbsoluteUrl = ((srcUrl.indexOf(':') === -1) ?
                            gamePath : '') + srcUrl;
    
    document.getElementById('cloneAssetSrcUrl').innerHTML = srcAbsoluteUrl;
    
    document.getElementById('cloneAssetDstUrl').innerHTML = gamePath +
        gameSource.json.assets[assetName].replace(/^.*\//, '');
    
    document.getElementById('cloneAssetKeepOriginal').checked = false;
    document.getElementById('cloneAssetNewName').disabled = true;
    document.getElementById('cloneAssetNewName').value = '';
}