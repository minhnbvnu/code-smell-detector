function theThemeHasChanged() {
    if (store.has("dark-or-white") && store.get("dark-or-white") === 0) {
        if (nativeTheme.shouldUseDarkColors) {
            styleCache.set('isdark', true);
            if (win != null) {
                win.setBackgroundColor('#191919');
                win.webContents.send('darkModeChanges');
            }
            if (customDialogWin != null) customDialogWin.setBackgroundColor('#191919');
        } else {
            styleCache.set('isdark', false);
            if (win != null) {
                win.setBackgroundColor('#fefefe');
                win.webContents.send('darkModeChanges');
            }
            if (customDialogWin != null) customDialogWin.setBackgroundColor('#fefefe');
        }
    }
}