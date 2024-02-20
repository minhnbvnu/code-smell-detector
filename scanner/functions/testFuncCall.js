function testFuncCall(test) {
  var server = http.createServer(function(req, res) {
    res.writeHeader(200);
    res.end();
  });
  server.on('listening', function() {
    console.log(`Listening on http://localhost:${server.address().port}/`);
    console.log('PID %d', process.pid);

    var heapSnapshotFile = 'heapdump-*.heapsnapshot';
    shelljs.rm('-f', heapSnapshotFile);

    function waitForHeapdump(err, filename) {
      var files = shelljs.ls(heapSnapshotFile);
      test.equals(err, null);
      test.equals(files.length, 1);
      test.equals(filename, files[0]);
      server.close();
      test.end();
    }

    heapdump.writeSnapshot(waitForHeapdump);
  });
  server.listen(0);
}