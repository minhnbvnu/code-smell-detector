function setupReadlineOptions(opt) {
  opt = opt || {};

  // Default `input` to stdin
  var input = opt.input || process.stdin;

  // Add mute capabilities to the output
  var ms = new MuteStream();
  ms.pipe(opt.output || process.stdout);
  var output = ms;

  return _.extend(
    {
      terminal: true,
      input: input,
      output: output
    },
    _.omit(opt, ['input', 'output'])
  );
}