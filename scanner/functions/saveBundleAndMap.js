function saveBundleAndMap(bundle, options, log) {
  const {
    'bundle-output': bundleOutput,
    'bundle-encoding': encoding,
    dev,
    'sourcemap-output': sourcemapOutput,
  } = options;

  log('start');
  const codeWithMap = createCodeWithMap(bundle, dev);
  log('finish');

  log('Writing bundle output to:', bundleOutput);
  const writeBundle = writeFile(bundleOutput, sign(codeWithMap.code), encoding);
  writeBundle.then(() => log('Done writing bundle output'));

  if (sourcemapOutput) {
    log('Writing sourcemap output to:', sourcemapOutput);
    const writeMap = writeFile(sourcemapOutput, codeWithMap.map, null);
    writeMap.then(() => log('Done writing sourcemap output'));
    return Promise.all([writeBundle, writeMap]);
  } else {
    return writeBundle;
  }
}