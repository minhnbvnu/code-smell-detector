function onNewAssetTypeChange() {
    const type = document.getElementById('newAssetType').value.toLowerCase();
    document.getElementById('newAssetSuffix').innerHTML = '_' + type;
    document.getElementById('newAssetMapOptions').style.display = (type === 'map' ? 'block' : 'none');
    if (type === 'map') {
        document.getElementById('newAssetMapYUp').checked = gameSource.json.y_up;
    }
}