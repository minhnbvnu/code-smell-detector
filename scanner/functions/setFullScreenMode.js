function setFullScreenMode(flag) {
    if (win != null) {
        if (!isLoose) {
            win.setKiosk(flag);
            if (flag) {
                kioskInterval = setInterval(function () {
                    if (fullScreenProtection && win != null) {
                        forceScreenLockSolution();
                        win.show();
                        win.setAlwaysOnTop(true, "screen-saver");
                        app.focus({ steal: true });
                        win.setKiosk(true);
                    }
                }, 2500);
            } else clearInterval(kioskInterval);
        } else win.setFullScreen(flag);

        //when fullscreen, prevent sleep
        if (sleepBlockerId) {
            if (!powerSaveBlocker.isStarted(sleepBlockerId))
                sleepBlockerId = powerSaveBlocker.start('prevent-display-sleep');
        } else sleepBlockerId = powerSaveBlocker.start('prevent-display-sleep');
    }
}