function addDataArgs(args) {
  args.options('start', {
    alias: 's',
    describe: 'Start time for the request'
  });

  args.options('end', {
    alias: 'e',
    describe: 'End time for the request'
  });

  // TODO(jlisee): filtering commands
}