function getDestinationFromConfig(configPath, config) {
  if (!config) {
    throw new Error('You must pass the location of the "clio.toml" file.');
  }

  if (!config.build) {
    throw new Error(
      `No build configuration has been found. Please add a [build] section to your "${configPath}" file.`
    );
  }

  if (!config.build.destination) {
    throw new Error(
      `The build directory is missing on your "${configPath}".\n\nExample:\n\n[build]\ndestination = "build"\n`
    );
  }

  return config.build.destination;
}