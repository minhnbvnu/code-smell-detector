function autostartAfter(val) {
    if (process.platform !== "linux") {
        if (val === true) {
            require('@electron/remote').app.setLoginItemSettings({
                openAtLogin: true
            });
        } else {
            require('@electron/remote').app.setLoginItemSettings({
                openAtLogin: false
            });
        }
    } else {
        ipc.send("alert", i18n.__('do-not-support-linux'));
        store.set("autostart", !val);
    }
}