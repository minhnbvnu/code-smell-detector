function unbundle(argv, config, packagerInstance) {
  return bundleWithOutput(argv, config, outputUnbundle, packagerInstance);
}