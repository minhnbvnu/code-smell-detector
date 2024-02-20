function languageSetting(val) {
    if (store.get('i18n') !== val) {
        store.set("i18n", val);
    }
    ipc.send("relaunch-dialog");
}