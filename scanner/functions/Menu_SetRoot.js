function Menu_SetRoot(item) {
    var newRoot = Menu_FindMenu(item);
    if (newRoot) {
        if (__rootMenuItem && __rootMenuItem != newRoot) {
            Menu_HideItems();
        }
        __rootMenuItem = newRoot;
    }
}