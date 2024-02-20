function onOpenGameFilterChange() {
    const filter = document.getElementById('openGameFilter').value.trim().toLowerCase();
    const list = document.querySelectorAll('#openGameListOL li');
    for (let i = 0; i < list.length; ++i) {
        const element = list[i];
        element.style.display = (filter === '') || (element.innerText.toLowerCase().indexOf(filter) !== -1) ? '' : 'none';
    }

    openGameFiles.selected = null;
}