function waiton(t, extra, cmd, pattern, next) {
  var name = testname(cmd, pattern);
  console.log('\n# START waiton %s', name);
  var running = true;
  t.once('end', function() {
    running = false;
  });
  return check();

  function check() {
    pmctl(cmd, function(out) {
      if (out.code === 0 && checkOutput(out, pattern)) {
        console.log('# OK waiton %s', name);
        t.assert(true, name);
        return next();
      }
      if (running)
        setTimeout(check, 1000);
    });
  }
}