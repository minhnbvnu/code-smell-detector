function toggle_tree_view() {
    var x = localStorage.getItem('iris-tm-tree');
    if (typeof x === 'undefined') {
        localStorage.setItem('iris-tm-tree', 'true');
        location.reload();
    } else {
        if (x === 'true') {
            localStorage.setItem('iris-tm-tree', 'false');
            location.reload();
        } else {
             localStorage.setItem('iris-tm-tree', 'true');
            location.reload();
        }
    }
}