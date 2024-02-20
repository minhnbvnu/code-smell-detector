function darkModeSettingsFinder() {
    if (nativeTheme.shouldUseDarkColors && store.get("dark-or-white") !== "light") {
        styleCache.set('isdark', true);
        if (win != null) {
            win.setBackgroundColor('#191919');
            win.webContents.send('darkModeChanges');
        }
        if (customDialogWin != null) customDialogWin.setBackgroundColor('#191919');
        if (settingsWin != null) {
            settingsWin.setBackgroundColor('#191919');
            settingsWin.webContents.send('darkModeChanges-settings');
        }
    }
}