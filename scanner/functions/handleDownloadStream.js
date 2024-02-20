function handleDownloadStream(stream, callback) {
    if (progressBar) {
      progressBar.total += stream.length - 1;
      progressBar.tick(0);
    }
    var bufs = [];
    stream.on('data', function(chunk) {
      if (progressBar)
        progressBar.tick(chunk.length);
      bufs.push(chunk);
    });
    stream.on('error', function(err) {
      callback(err);
    });
    stream.on('end', function() {
      callback(null, bufs);
    });
    stream.resume();
  }