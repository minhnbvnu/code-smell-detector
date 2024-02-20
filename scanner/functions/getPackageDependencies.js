function getPackageDependencies(configPath) {
  const config = getPackageConfig(configPath);
  return config.dependencies;
}