function hotkeyInit() {
    function isTagNude(tag) {
        return tag.indexOf('Control') === -1 && tag.indexOf('Shift') === -1
            && tag.indexOf('Alt') === -1 && tag.indexOf('Command') === -1 && tag.indexOf('Win') === -1;
    }

    //delete the old style show-or-hide
    if (store.has('hotkey1')) {
        if (isTagNude(store.get('hotkey1')))
            store.set('hotkey.showOrHide', cmdOrCtrl._("long", "pascal") + ' + Alt + Shift + ' + store.get('hotkey1'));
        else
            store.set('hotkey.showOrHide', {
                name: 'showOrHide',
                value: store.get('hotkey1')
            });
        store.delete('hotkey1');
    }

    //delete the old style start-or-stop
    if (store.has('hotkey2')) {
        if (isTagNude(store.get('hotkey2')))
            store.set('hotkey.startOrStop', cmdOrCtrl._("long", "pascal") + ' + Alt + Shift + ' + store.get('hotkey2'));
        else
            store.set('hotkey.startOrStop', {
                name: 'startOrStop',
                value: store.get('hotkey2')
            });
        store.delete('hotkey2');
    }

    //the new, convenient style of hotkey definitions
    const hotkeyList = [
        {
            name: "startOrStop",
            defaultHotkey: 'S',
            function: () => {
                if (isTimerWin) if (win != null) win.webContents.send('start-or-stop');
            }
        },
        {
            name: "showOrHide",
            defaultHotkey: 'W',
            function: () => {
                if (!isTimerWin || (isWorkMode && (workTimeFocused === false))
                    || ((!isWorkMode) && (restTimeFocused === false))
                    || (isLoose && process.platform !== "darwin")) {
                    showOrHide();
                }//prevent using hotkeys to quit
            }
        },
        {
            name: "settings",
            defaultHotkey: 'P',
            function: () => {
                if (!isTimerWin) settings();
            }
        },
        {
            name: "backHome",
            defaultHotkey: 'B',
            function: () => {
                if (isTimerWin && ((isWorkMode && (workTimeFocused === false))
                    || ((!isWorkMode) && (restTimeFocused === false))))
                    win.webContents.send("remote-control-msg", "back");
            }
        },
        {
            name: "nextPeriod",
            defaultHotkey: 'N',
            function: () => {
                if (isTimerWin && ((isWorkMode && (workTimeFocused === false))
                    || ((!isWorkMode) && (restTimeFocused === false))))
                    win.webContents.send("remote-control-msg", "skipper");
            }
        },
        {
            name: "miniMode",
            defaultHotkey: 'M',
            function: () => {
                if (isTimerWin && ((isWorkMode && (workTimeFocused === false))
                    || ((!isWorkMode) && (restTimeFocused === false)))) {
                    if (!hasFloating) win.webContents.send("remote-control-msg", "enter");
                    else {
                        floatingDestroyer("");
                        win.show();
                    }
                }
            }
        }
    ];

    for (i in hotkeyList) {
        if (!store.has("hotkey." + hotkeyList[i].name))
            store.set("hotkey." + hotkeyList[i].name,
                {
                    name: hotkeyList[i].name,
                    value: cmdOrCtrl._("long", "pascal") + ' + Alt + Shift + ' + hotkeyList[i].defaultHotkey
                });
        if (!globalShortcut.isRegistered(store.get('hotkey.' + hotkeyList[i].name).value))
            globalShortcut.register(store.get('hotkey.' + hotkeyList[i].name).value, hotkeyList[i].function);
    }
}