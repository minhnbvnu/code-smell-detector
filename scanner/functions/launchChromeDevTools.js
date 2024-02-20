function launchChromeDevTools(port) {
  var debuggerURL = 'http://localhost:' + port + '/debugger-ui';
  console.log('Launching Dev Tools...');
  opn(debuggerURL, {app: [getChromeAppName()]}, function(err) {
    if (err) {
      console.error('Google Chrome exited with error:', err);
    }
  });
}