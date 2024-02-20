function doPmctl(t, noEnd) {
    var cmd = cli + ' -C ' + CTL + ' ' + util.format.apply(util, args);
    exec(cmd, function(err, stdout) {
      console.log('# Run: %s => err: %j stdout <\n%s>', cmd, err, stdout);
      t.ifError(err);
      if (!noEnd) {
        t.end();
      }
    });
  }