function updateParse(uri) {
  connection.console.info(`Parsing ${uri}...`);
  const diagnostics = [];
  try {
    const fileName = fileURLToPath(uri);
    const root = getProjectRoot(fileName);
    const configPath = join(root, "clio.toml");
    const config = getPackageConfig(configPath);
    const sourceDir = config.build.source;

    const parent = getParentProjectRoot(fileName);
    const parentConfigPath = join(parent, "clio.toml");
    const parentConfig = getPackageConfig(parentConfigPath);

    const cacheDir = join(parentConfig.build.destination, ".clio", "cache");
    const modulesDir = join(parentConfig.build.source, MODULES_PATH);
    const modulesDestDir = join(parentConfig.build.destination, MODULES_PATH);

    const relativeFile = relative(sourceDir, fileName);
    const moduleName = `${config.title}@${config.version}`;

    const srcPrefix =
      parentConfigPath === configPath ? "" : join(modulesDir, moduleName);
    const destPrefix =
      parentConfigPath === configPath ? "" : join(modulesDestDir, moduleName);

    const { scope } = compileFile(
      relativeFile,
      config,
      configPath,
      modulesDir,
      modulesDestDir,
      root,
      srcPrefix,
      destPrefix,
      cacheDir,
      { configs: {}, npmDeps: {}, npmDevDeps: {} }
    );

    parses.set(uri, scope);

    if (DEBUG_MODE) {
      connection.console.log(inspect(scope));
    }
  } catch (e) {
    const trace = errorToDiagnostic(e);
    if (trace) {
      diagnostics.push(trace);
    }
  }

  connection.sendDiagnostics({ uri, diagnostics });
}