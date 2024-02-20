function nonFocusSolution(mode) {
    if (win != null) {
        multiScreenSolution("off");
        setFullScreenMode(false);
        macOSFullscreenSolution(false);
        traySolution(false);
        isFullscreenMode = false;
        win.setFocusable(true);
        if (sleepBlockerId) {
            if (powerSaveBlocker.isStarted(sleepBlockerId)) {
                powerSaveBlocker.stop(sleepBlockerId);
            }
        }
        if (hasFloating) {
            if (floatingWin == null) {
                floating();
            }
            win.hide();
        } else if ((mode === "work" && store.get("when-work-time-end") === 2) || (mode === "rest" && store.get("when-rest-time-end") === 2)) {
        } else {
            win.show();
            win.center();
            win.flashFrame(true);
            if (!isLoose) win.setAlwaysOnTop(true, "screen-saver");
            win.moveTop();
        }
    }
}