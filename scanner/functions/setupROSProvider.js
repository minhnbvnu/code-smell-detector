function setupROSProvider(args) {
  if (args.rosConfig) {
    registerROSBagProvider(args.rosConfig);
  }
}