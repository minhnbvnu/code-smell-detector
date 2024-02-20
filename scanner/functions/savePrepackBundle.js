function savePrepackBundle(bundle, options, log) {
  const {
    'bundle-output': bundleOutput,
    'bridge-config': bridgeConfig,
  } = options;

  const result = bundle.build({
    batchedBridgeConfig: bridgeConfig
  });

  log('Writing prepack bundle output to:', bundleOutput);
  const writePrepackBundle = writeFile(bundleOutput, result, 'ucs-2');
  writePrepackBundle.then(() => log('Done writing prepack bundle output'));
  return writePrepackBundle;
}