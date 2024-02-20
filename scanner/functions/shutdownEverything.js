function shutdownEverything() {
  const {BrowserWindow} = require('electron');
  function killer() {
    console.log('killing all windows for shutdown');
    for (var w of BrowserWindow.getAllWindows()) {
      w.close();
    }
  }
  setInterval(killer, 1000);
  killer();
}