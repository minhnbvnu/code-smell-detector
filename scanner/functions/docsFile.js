async function docsFile(file, configPath) {
  const config = getPackageConfig(configPath);
  const sourceDir = getSourceFromConfig(configPath, config);
  const destination = getDestinationFromConfig(configPath, config);
  const cacheDir = join(destination, ".clio", "cache");
  const modulesDir = join(sourceDir, MODULES_PATH);
  const modulesDestDir = join(destination, MODULES_PATH);
  const relativeFile = relative(sourceDir, file);

  const { scope } = compileFile(
    relativeFile,
    config,
    configPath,
    modulesDir,
    modulesDestDir,
    dirname(configPath),
    "",
    "",
    cacheDir,
    { configs: {}, npmDeps: {}, npmDevDeps: {} }
  );
  const fns = Object.entries(scope)
    .filter(([_, info]) => info.description)
    .map(([name, info]) => ({ ...info, name }));
  return selectFn(file, fns, configPath);
}