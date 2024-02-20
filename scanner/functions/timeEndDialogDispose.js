function timeEndDialogDispose(mode) {
    noCheckTimeSolution(mode);
    win.webContents.send('warning-closed');
}