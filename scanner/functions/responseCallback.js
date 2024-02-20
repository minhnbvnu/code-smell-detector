function responseCallback(res) {
    res.setEncoding('utf8');
    res.on('data', function onData(chunk) {
    });
    res.on('end', function onEnd() {
      callback();
    });
  }