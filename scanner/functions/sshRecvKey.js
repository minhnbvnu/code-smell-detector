function sshRecvKey(event, body) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    console.log("ssh-recv-key", body);
    this.instances[body.sessionId].stdin(win, body);
}