function settingsBackup(mode) {
    let cipherText = aes.encrypt(JSON.stringify((mode === "statistics") ? statistics.store : store.store), (mode === "statistics") ? String("She's awesome.") : String("We all love wnr, so please do not use this passcode to do bad things."));
    copyToClipboard(cipherText.toString());
    ipc.send("notify", i18n.__('copied'));
}