async function createXVIZProvider(ProviderClass, args) {
  let provider = null;
  provider = new ProviderClass(args);
  await provider.init();

  if (provider.valid()) {
    return provider;
  }

  return null;
}