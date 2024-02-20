function onAddAssetFilterChange() {
    const filter = document.getElementById('addAssetFilter').value.trim().toLowerCase();
    const list = document.querySelectorAll('#addAssetListOL li');
    for (let i = 0; i < list.length; ++i) {
        const element = list[i];
        element.style.display = (filter === '') || (element.innerText.toLowerCase().indexOf(filter) !== -1) ? '' : 'none';
    }
}