function showNewAssetDialog() {
    document.getElementById('newAssetDialog').classList.remove('hidden');
    document.getElementById('newAssetCreateButton').disabled = true;
    const text = document.getElementById('newAssetName');
    text.value = '';
    text.focus();
    onNewAssetTypeChange();

    // Remove previous spritesheet options for the map
    const spritesheetDropdown = document.getElementById('newAssetMapSpritesheet');
    spritesheetDropdown.innerHTML = '';
    
    fetchAssetTable(function(table) {
        const array = table.sprite;
        let s = '';
        for (let i = 0; i < array.length; ++i) {
            const url = array[i];
            // Do not show raw PNGs as potential map spritesheets. There
            // are too many issues with not having metadata for them.
            if (! url.endsWith('.png')) {
                s += `<option value="${url}">${url}</option>`;
            }
        }
        spritesheetDropdown.innerHTML = s;
        spritesheetDropdown.dispatchEvent(new Event('change'));
    });
}