function noCheckTimeSolution(mode) {
    if ((mode === "rest" ? workTimeFocused : restTimeFocused) && (!isLoose)) {
        fullScreenProtection = true;
    } else {
        if (store.get("top") !== true) {
            win.setAlwaysOnTop(false);//cancel unnecessary always-on-top
            if ((mode === "work" && store.get("when-work-time-end") === 2) || (mode === "resdt" && store.get("when-rest-time-end") !== 2)) {
            } else if (!hasFloating) win.moveTop();
        }
        if (dockHide) app.dock.hide();
    }
    //win.maximizable = false;
}