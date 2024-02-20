function checkOutput(out, pattern) {
  // undefined and '' become /(?:)/
  // RegExp's become themselves
  var match = new RegExp(pattern).test(out.output);
  // debug('pattern match: %j', match);
  // debug('out <\n%s>', out.output);
  return match;
}