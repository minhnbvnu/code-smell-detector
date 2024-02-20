function onAddAssetTypeChange() {
    const t = document.getElementById('addAssetType').value;
    let s = '<ol id="addAssetListOL" class="select-list">\n';
    if (addAssetFiles) {
        const fileArray = addAssetFiles[t];
        for (let i = 0; i < fileArray.length; ++i) {
            const file = fileArray[i];
            const path = (file.indexOf('/') === -1) ? '' : file.replace(/\/[^\/]+$/, '/');
            const rest = file.replace(/^.*\//, '');
            const base = rest.replace(/\..+?$/, '');
            const ext  = rest.replace(/^[^\.]+/, '');
            s += `<li onclick="onAddAssetListSelect(this)">${path}<b style="color:#000">${base}</b>${ext}</li>\n`;
        }
    }
    s += '</ol>';

    const list = document.getElementById('addAssetList');
    list.innerHTML = s;

    onAddAssetFilterChange();

    addAssetFiles.selected = null;
    // Recreating the list destroys any selection
    document.getElementById('addAssetAddButton').disabled = true;
}