function bundleWithOutput(argv, config, output, packagerInstance) {
  const args = parseCommandLine(bundleCommandLineArgs, argv);
  if (!output) {
    output = args.prepack ? outputPrepack : outputBundle;
  }
  return buildBundle(args, config, output, packagerInstance);

}