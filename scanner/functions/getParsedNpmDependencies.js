function getParsedNpmDependencies(configPath) {
  const dependencies = {};
  const npmDependencies = getPackageConfig(configPath).npm.dependencies;
  if (npmDependencies) {
    npmDependencies.forEach((dep) => {
      dependencies[dep.name] = dep.version;
    });
  }
  return dependencies;
}