function addCondensedArg(args, help) {
  args.options('condensed', {
    alias: 'c',
    boolean: true,
    describe: help
  });
}