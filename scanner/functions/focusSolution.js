function focusSolution() {
    if (hasFloating) floatingDestroyer("property-stay");
    win.show();
    win.center();
    win.flashFrame(true);
    if (!isLoose) win.setAlwaysOnTop(true, "screen-saver");
    win.moveTop();
    if (dockHide) app.dock.show();//prevent kiosk error, show in dock
    if (!isLoose) multiScreenSolution("on");
    setFullScreenMode(true);
    macOSFullscreenSolution(true);
    traySolution(true);
    isFullscreenMode = true;
    if ((process.env.NODE_ENV !== "development") && (!isLoose)) win.setFocusable(false);
    if (sleepBlockerId) {
        if (!powerSaveBlocker.isStarted(sleepBlockerId)) {
            sleepBlockerId = powerSaveBlocker.start('prevent-display-sleep');
        }
    }
}