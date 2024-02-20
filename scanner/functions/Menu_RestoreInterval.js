function Menu_RestoreInterval() {
    if (__menuInterval && __rootMenuItem) {
        Menu_ClearInterval();
        __menuInterval = window.setInterval("Menu_HideItems()", __disappearAfter);
    }
}