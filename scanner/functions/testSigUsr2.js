function testSigUsr2(test) {
  var server = http.createServer(function(req, res) {
    res.writeHeader(200, {
      'Content-Type': 'text/plain;charset=utf-8',
      'Content-Length': '2',
    });
    res.end('OK');
  });

  server.on('listening', function() {
    console.log(`Listening on http://localhost:${server.address().port}/`);
    console.log('now sending SIGUSR2 to %d', process.pid);

    var heapSnapshotFile = 'heapdump-*.heapsnapshot';
    shelljs.rm('-f', heapSnapshotFile);

    var killCmd = shelljs.which('kill');
    var cmd = [killCmd, '-usr2', process.pid].join(' ');
    console.log('executing kill');
    shelljs.exec(cmd);

    function waitForHeapdump() {
      var files = shelljs.ls(heapSnapshotFile);
      test.ok(files.length > 0, 'Heap file should be present');
      server.close();
      test.end();
    }

    setTimeout(waitForHeapdump, 500);
  });

  server.listen(0);
}