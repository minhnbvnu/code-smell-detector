function addMetadataArg(args, help) {
  args.options('metadata', {
    alias: 'm',
    boolean: true,
    describe: help
  });
}