function is_timeline_tree_view() {
    var x = localStorage.getItem('iris-tm-tree');
    if (typeof x !== 'undefined') {
        if (x === 'true') {
            return true;
        }
    }
    return false;
}