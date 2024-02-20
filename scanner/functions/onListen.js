function onListen () {
    debugTestPort("done w/ testPort(): OK", options.host, "port", options.port);

    options.server.removeListener('error', onError);
    options.server.close();
    callback(null, options.port);
  }