function saveAsIndexedFile(bundle, options, log) {
  const {
    'bundle-output': bundleOutput,
    'bundle-encoding': encoding,
    'sourcemap-output': sourcemapOutput,
  } = options;

  log('start');
  const {startupCode, modules} = bundle.getUnbundle('INDEX');
  log('finish');

  log('Writing unbundle output to:', bundleOutput);
  const writeUnbundle = writeBuffers(
    fs.createWriteStream(bundleOutput),
    buildTableAndContents(startupCode, modules, encoding)
  ).then(() => log('Done writing unbundle output'));

  return Promise.all([
    writeUnbundle,
    writeSourceMap(
      sourcemapOutput,
      buildUnbundleSourcemap(bundle),
      log,
    ),
  ]);
}