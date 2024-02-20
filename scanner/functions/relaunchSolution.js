function relaunchSolution() {
    fullScreenProtection = false;
    if (win != null) {
        win.setKiosk(false);
        win.hide();
    }

    app.relaunch();
    app.exit();
}