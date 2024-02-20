function Menu_FindMenu(item) {
    if (item && item.menu) return item.menu;
    var tr = item.parentNode.parentNode.parentNode.parentNode.parentNode;
    if (!tr.id) {
        tr = tr.parentNode;
    }
    for (var i = tr.id.length - 1; i >= 0; i--) {
        if (tr.id.charAt(i) < '0' || tr.id.charAt(i) > '9') {
            var menu = WebForm_GetElementById(tr.id.substr(0, i));
            if (menu) {
                item.menu = menu;
                return menu;
            }
        }
    }
    return null;
}