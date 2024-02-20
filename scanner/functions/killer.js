function killer() {
    console.log('killing all windows for shutdown');
    for (var w of BrowserWindow.getAllWindows()) {
      w.close();
    }
  }