function getSourceFromConfig(configPath, config) {
  if (!config.build) {
    throw new Error(
      `No build configuration has been found. It is a "[build]" section on your "${configPath}" file.`
    );
  }

  if (!config.build.source) {
    throw new Error(
      `Could not find a source directory for build in your ${configPath} file.`
    );
  }

  return config.build.source;
}