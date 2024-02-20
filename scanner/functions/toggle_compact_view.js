function toggle_compact_view() {
    var x = localStorage.getItem('iris-tm-compact');
    if (typeof x === 'undefined') {
        localStorage.setItem('iris-tm-compact', 'true');
        location.reload();
    } else {
        if (x === 'true') {
            localStorage.setItem('iris-tm-compact', 'false');
            location.reload();
        } else {
             localStorage.setItem('iris-tm-compact', 'true');
            location.reload();
        }
    }
}