function startPm() {
  var app = new Server({
    // Choose driver based on cli options/env once we have alternate drivers.
    Driver: driver,
    baseDir: base,
    basePort: basePort,
    cmdName: $0,
    listenPort: listen,
    dbDriver: dbDriver,
  });

  app.on('listening', function(listenAddr) {
    console.log('%s(%d): StrongLoop PM v%s (API v%s) on port `%s`',
      $0, process.pid,
      versionPm,
      versionApi,
      listenAddr.port);

    console.log('%s(%d): Base folder `%s`',
      $0, process.pid, base);

    console.log('%s(%d): Applications on port `%d + service ID`',
      $0, process.pid, basePort);
  });

  app.start();

  // XXX stop just signals the supervisor with SIGTERM, and closes sockets.
  // the socket close won't even complete while there are open connections...,
  // which may happen if exec keeps a persistent ipc connection on pm. I'm
  // not sure there is any point to this anymore, now what we only support
  // supervisor as a runner, and supervisor exits when the parent exits. I think
  // we can just let the signal terminate us, the OS will close sockets, and
  // supervisor will exit itself.
  //
  // A fair amount of code dribbles down from this point that could be deleted.
  stopWhenDone($0, app);
}