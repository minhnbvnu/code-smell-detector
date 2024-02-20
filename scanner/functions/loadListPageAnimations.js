function loadListPageAnimations() {
    const list = document.getElementById('list');
    const rows = list.querySelectorAll('.row_container');
    for (let i = 0; i < rows.length; i++) {
        createRowAnimations(rows[i]);
    }
}