function Menu_Collapse(item) {
    Menu_SetRoot(item);
    if (__rootMenuItem) {
        Menu_ClearInterval();
        if (__disappearAfter >= 0) {
            __menuInterval = window.setInterval("Menu_HideItems()", __disappearAfter);
        }
    }
}