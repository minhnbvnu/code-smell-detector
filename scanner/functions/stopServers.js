function stopServers(callback, index) {
  if (index < servers.length) {
    servers[index].close(function (err) {
      if (err) {
        callback(err, false);
      } else {
        stopServers(callback, index + 1);
      }
    });
  } else {
    callback(null, true);
  }
}