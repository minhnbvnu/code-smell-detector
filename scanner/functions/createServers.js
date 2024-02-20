function createServers (callback) {
  var base = 0;

  _async.whilst(
    function () { return base < 5 },
    function (next) {
      var server = net.createServer(function () { }),
          name = base === 0 ? 'test.sock' : 'test' + base + '.sock',
          sock = path.join(socketDir, name);

      // shamelessly stolen from foreverjs,
      // https://github.com/foreverjs/forever/blob/6d143609dd3712a1cf1bc515d24ac6b9d32b2588/lib/forever/worker.js#L141-L154
      if (process.platform === 'win32') {
        //
        // Create 'symbolic' file on the system, so it can be later
        // found via "forever list" since the `\\.pipe\\*` "files" can't
        // be enumerated because ... Windows.
        //
        fs.openSync(sock, 'w');

        //
        // It needs the prefix, otherwise EACCESS error happens on Windows
        // (no .sock extension, only named pipes with .pipe prefixes)
        //
        sock = '\\\\.\\pipe\\' + sock;
      }

      server.listen(sock, next);
      base++;
      servers.push(server);
    }, callback);
}