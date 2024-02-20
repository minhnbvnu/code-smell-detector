function runTests(queue, t, server) {
    console.log('# running queued tests... (%d)', queue.length);
    async.series(queue, function() {
      if (server) {
        server.on('exit', function(code, signal) {
          debug('server exit: code %j signal %j', code, signal);
          t.notEqual(code, 0, 'pm server shutdown by us');
          t.end();
        });
        setTimeout(server.kill.bind(server, 'SIGTERM'), 2000);
      } else {
        t.end();
      }
    });
  }