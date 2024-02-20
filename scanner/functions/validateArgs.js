function validateArgs(inArgs) {
  return inArgs.command(
    'validate <host> [log]',
    'Validate XVIZ data and message flow',
    args => {
      addDataArgs(args);
      addMetadataArg(args, 'Just check the metadata');
      addCondensedArg(args, 'Display summary information');

      args.options('type', {
        alias: 't',
        describe: 'Just report on this type'
      });
    },
    args => {
      command(args);
    }
  );
}