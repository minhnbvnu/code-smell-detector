function onUpdateClick(installedVersionText, latestVersionText) {
    onStopButton();

    showConfirmDialog(
        'Update',
        'Update from quadplay✜ version ' + installedVersionText + ' to version ' + latestVersionText + '?',
        doUpdate);
}