function showAddAssetDialog() {
    document.getElementById('addAssetDialog').classList.remove('hidden');
    document.getElementById('addAssetAddButton').disabled = true;
    document.getElementById('addAssetFilter').value = '';
    const text = document.getElementById('addAssetName');
    text.value = '';
    text.focus();

    fetchAssetTable(function(table) {
        addAssetFiles = table;

        // Create the initial display
        onAddAssetTypeChange();
    });
}