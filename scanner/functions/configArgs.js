function configArgs(inArgs) {
  const cmd = 'config <bag>';

  return inArgs.command(
    cmd,
    'Extracts basic information and outputs a configuration for the XVIZROSProvider',
    {},
    configCmd
  );
}