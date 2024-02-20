function failon(t, extra, cmd, pattern, next) {
  var name = testname(cmd, pattern);
  console.log('\n# START failon %s', name);
  pmctl(cmd, function(out) {
    var match = checkOutput(out, pattern);
    extra = makeExtra(match, name, out.output, pattern, extra.stack);
    console.log('# failon %s against code: %j', name, out.code);

    t.notEqual(out.code, 0, 'exit status should not be zero for: ' + name);

    if (out.code !== 0) {
      t.assert(match, name, extra);
    }

    if (out.code === 0 || !match) {
      console.log('check failed against code %d <\n%s>', out.code, out.output);
    }

    return next();
  });
}