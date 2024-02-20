function startAuthServer(chromeAppId) {
  appId = chromeAppId;
  return new Promise((resolve, reject) => {
    authServer.on('error', function() {
      resolve();
    });
    authServer.listen(45613, function() {
      identity.authServerPort = authServer.address().port;
      resolve();
    })
    authServer.on('request', function(req, res) {
      try {
        var random = req.url.split('?')[0].split('/')[1];
        cb = authCallback;
        if (!cb) {
          res.writeHead(404);
          res.end('electron chrome auth server callback not found');
          return;
        }
        authCallback = null;
        res.end('<html><head><script>window.close();</script></head><body>Logged in.</body></html>')
        cb(req.url);
      }
      catch (e) {
        console.error('unexpected error during auth request', e);
      }
    })
  });
}