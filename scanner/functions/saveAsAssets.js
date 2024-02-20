function saveAsAssets(bundle, options, log) {
  const {
    'bundle-output': bundleOutput,
    'bundle-encoding': encoding,
    'sourcemap-output': sourcemapOutput,
  } = options;

  log('start');
  const {startupCode, startupModules, modules} = bundle.getUnbundle('ASSETS');
  log('finish');

  log('Writing bundle output to:', bundleOutput);
  const modulesDir = path.join(path.dirname(bundleOutput), MODULES_DIR);
  const writeUnbundle =
    createDir(modulesDir).then( // create the modules directory first
      () => Promise.all([
        writeModules(modules, modulesDir, encoding),
        writeFile(bundleOutput, startupCode, encoding),
        writeMagicFlagFile(modulesDir),
      ])
    );
  writeUnbundle.then(() => log('Done writing unbundle output'));

  const sourceMap =
    buildSourceMapWithMetaData({startupModules, modules});

  return Promise.all([
    writeUnbundle,
    writeSourceMap(sourcemapOutput, JSON.stringify(sourceMap), log)
  ]);
}