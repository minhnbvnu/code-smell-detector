function profileStartup(initialTime) {
    function profile() {
      console.profile('startup');
      const startTime = Date.now();
      setupWindow().then(function() {
        setLoadTime(Date.now() - startTime + initialTime);
        console.profileEnd('startup');
        console.log(
          'Switch to the Profiles tab to view the created startup profile'
        );
      });
    }

    const webContents = electron.remote.getCurrentWindow().webContents;
    if (webContents.devToolsWebContents) {
      profile();
    } else {
      webContents.once('devtools-opened', () => {
        setTimeout(profile, 1000);
      });
      webContents.openDevTools();
    }
  }