function dumpArgs(inArgs) {
  return inArgs.command(
    'dump <host> [log]',
    'Print XVIZ data to stdout',
    args => {
      addDataArgs(args);
      addMetadataArg(args, 'Just fetch metadata and exit');
      addCondensedArg(args, 'Display summary information');
    },
    args => {
      command(args);
    }
  );
}