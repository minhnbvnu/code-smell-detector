function settingsImport(token, mode) {
    let bytes = aes.decrypt(token, (mode === "statistics") ? String("She's awesome.") : String("We all love wnr, so please do not use this passcode to do bad things."));
    let isAllRight = true, formerData = null;
    try {
        let decryptedData = JSON.parse(bytes.toString(encoding));
        if (mode === "statistics") {
            formerData = statistics.store;
            statistics.clear();
            statistics.set(decryptedData);
            ipc.send("relaunch-dialog");
        } else {
            formerData = store.store;
            store.clear();
            store.set(decryptedData);
            if (process.platform !== "linux")
                autostartAfter(store.has("autostart") ? store.get("autostart") : false);
            setTimeout(() => ipc.send("relaunch-dialog"), 1500);
        }
    } catch (error) {
        ipc.send("alert", i18n.__('settings-import-error'));
        isAllRight = false;
        if (mode === "statistics") statistics.set(formerData);
        else store.set(formerData);
    }
}