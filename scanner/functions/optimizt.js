async function optimizt({ paths, avif, webp, force, lossless, verbose, output, config }) {
  const configFilepath = pathToFileURL(config ? checkConfigPath(config) : findConfig());
  const configData = await import(configFilepath);
  const preparedConfig = prepareConfig(configData);

  if (verbose) enableVerbose();

  if (avif || webp) {
    await convert({
      paths: prepareFilePaths(paths, ['gif', 'jpeg', 'jpg', 'png']),
      lossless,
      avif,
      webp,
      force,
      output: prepareOutputPath(output),
      config: preparedConfig.convert,
    });
  } else {
    await optimize({
      paths: prepareFilePaths(paths, ['gif', 'jpeg', 'jpg', 'png', 'svg']),
      lossless,
      output: prepareOutputPath(output),
      config: preparedConfig.optimize,
    });
  }
}