function isDarkMode() {
    if (app.isReady()) {
        if (store.has("dark-or-white")) {
            if (store.get("dark-or-white") === "light") {
                if (win != null) win.setBackgroundColor('#fefefe');
                if (customDialogWin != null) customDialogWin.setBackgroundColor('#fefefe');
                return false;
            } else {
                if (customDialogWin != null) customDialogWin.setBackgroundColor('#191919');
                return true;
            }
        } else {
            styleCache.set('isdark', false);
            darkModeSettingsFinder();
            return styleCache.get('isdark');
        }
    }
}