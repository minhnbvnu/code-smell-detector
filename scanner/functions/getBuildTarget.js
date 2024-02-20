function getBuildTarget(configPath, config) {
  if (!config) {
    throw new Error('You must pass the location of the "clio.toml" file.');
  }

  if (!config.build) {
    throw new Error(
      `No build configuration has been found. Please add a [build] section to your "${configPath}" file.`
    );
  }

  if (!config.build.target) {
    throw new Error(`"target" field is missing in your "${configPath}" file.`);
  }

  return config.build.target;
}