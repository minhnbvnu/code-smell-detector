function is_timeline_compact_view() {
    var x = localStorage.getItem('iris-tm-compact');
    if (typeof x !== 'undefined') {
        if (x === 'true') {
            return true;
        }
    }
    return false;
}