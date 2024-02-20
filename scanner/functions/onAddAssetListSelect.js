function onAddAssetListSelect(target) {
    const list = document.getElementById('addAssetListOL');
    for (let i = 0; i < list.children.length; ++i) {
        list.children[i].classList.remove('selected');
    }
    target.classList.add('selected');
    addAssetFiles.selected = target.innerText;

    const addAssetName = document.getElementById('addAssetName');
    if (addAssetName.value.length === 0) {
        const type = document.getElementById('addAssetType').value;
        addAssetName.value = suggestedAssetFilename(addAssetFiles.selected, '_' + type);
    }
    
    document.getElementById('addAssetAddButton').disabled = (addAssetName.value.length === 0);
}