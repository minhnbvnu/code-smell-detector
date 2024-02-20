function launchDevTools(options, isChromeConnected) {
  // Explicit config always wins
  var customDebugger = process.env.REACT_DEBUGGER;
  if (customDebugger) {
    var projects = options.projectRoots.map(escapePath).join(' ');
    var command = customDebugger + ' ' + projects;
    console.log('Starting custom debugger by executing: ' + command);
    child_process.exec(command, function (error, stdout, stderr) {
      if (error !== null) {
        console.log('Error while starting custom debugger: ' + error);
      }
    });
  } else if (!isChromeConnected()) {
    // Dev tools are not yet open; we need to open a session
    launchChromeDevTools(options.port);
  }
}