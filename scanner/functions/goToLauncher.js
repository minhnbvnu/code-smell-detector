function goToLauncher() {
    onStopButton(false, true);
    console.log('Loading to go to the launcher.');
    loadGameIntoIDE(launcherURL, function () {
        onResize();
        // Prevent the boot animation
        onPlayButton(false, true);
    }, true);
}