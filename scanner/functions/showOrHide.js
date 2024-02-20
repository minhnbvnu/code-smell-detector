function showOrHide() {
    if (settingsWin != null)
        if (settingsWin.isVisible()) {
            settingsWin.hide();
        } else {
            settingsWin.show();
        }
    if (aboutWin != null)
        if (aboutWin.isVisible()) {
            aboutWin.hide();
        } else {
            aboutWin.show();
        }
    if (tourWin != null)
        if (tourWin.isVisible()) {
            tourWin.hide();
        } else {
            tourWin.show();
        }
    if (win != null)
        if (floatingWin == null)
            if (win.isVisible() && isFocused) {
                win.hide();
            } else {
                win.show()
            }
}