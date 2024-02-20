function sshStartConnect(event, body) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  console.log("ssh-start-connect with body", body);
  var id = this.create(win, body.ip, body.port, body.username, body.authtype, body.authpassword);
  return {sessionId:id}
}