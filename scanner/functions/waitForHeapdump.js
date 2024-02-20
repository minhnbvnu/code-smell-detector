function waitForHeapdump() {
      var files = shelljs.ls(heapSnapshotFile);
      test.ok(files.length > 0, 'Heap file should be present');
      server.close();
      test.end();
    }