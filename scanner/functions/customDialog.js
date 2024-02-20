function customDialog(mode, title, msg, executeAfter) {
    if (isMaximized) {
        win.webContents.send("fullscreen-custom-dialog", {
            title: title,
            message: msg,
            executeAfter: executeAfter
        })
        return;
    }
    if (executeAfter == null) executeAfter = "";
    if (mode === "on" || mode === "select_on" || mode === "update_on") {
        if (customDialogWin != null) {
            customDialogWin.webContents.send("dialog-init", {
                title: title,
                msg: msg,
                executeAfter: executeAfter,
                type: getCustomDialogModeType(mode)
            });
            customDialogWin.show();
            customDialogWin.setAlwaysOnTop(true, "pop-up-menu");
            customDialogWin.focus();
            if (mode === "update_on") {
                customDialogWin.setSize(Math.floor(240 * ratio) * 2, customDialogWin.getSize()[1]);
            } else {
                customDialogWin.setSize(Math.floor(240 * ratio), customDialogWin.getSize()[1]);
            }
            customDialogWin.center();
        }
    } else if (mode === "off") {
        if (customDialogWin != null) customDialogWin.hide();
        try {
            eval(executeAfter);
        } catch (e) {
            console.log(e);
        }
    } else if (mode === "cancel") {
        if (customDialogWin != null) customDialogWin.hide();
    } else if (mode === "button3_update") {
        shell.openExternal("https://github.com/RoderickQiu/wnr/releases/latest");

        if (customDialogWin != null) customDialogWin.hide();
    }
}