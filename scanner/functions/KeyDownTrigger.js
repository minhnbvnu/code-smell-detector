function KeyDownTrigger(event) {
    event.preventDefault();
    keyDownGet = "";

    const keyName = event.key;

    if (keyName === 'Control' || keyName === 'Alt' || keyName === 'Shift' || keyName === 'Meta') return;

    if (event.metaKey) keyDownGet += (process.platform === "darwin") ? "Cmd + " : "";
    if (event.ctrlKey) keyDownGet += "Ctrl + ";
    if (event.altKey) keyDownGet += "Alt + ";
    if (event.shiftKey) keyDownGet += "Shift + ";
    if (keyName) keyDownGet += keyName.toUpperCase();
    if (keyName.indexOf("Unidentified") === -1 && keyName.indexOf("Dead") === -1 && keyName.indexOf("PROCESS") === -1) {
        if (isTagNude(keyDownGet)) keyDownGet = cmdOrCtrl._('long', 'pascal') + " + Shift + Alt + " + keyDownGet;
        $("#hotkey-" + hotkeyTo).val(keyDownGet);
        ipc.send("global-shortcut-set", {
            type: hotkeyTo,
            before: store.get("hotkey." + hotkeyTo).value,
            to: keyDownGet
        });
    } else keyDownGet = "";
}