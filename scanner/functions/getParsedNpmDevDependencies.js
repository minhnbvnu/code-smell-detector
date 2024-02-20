function getParsedNpmDevDependencies(configPath) {
  const dependencies = {};
  const npmDevDependencies = getPackageConfig(configPath).npm.devDependencies;
  if (npmDevDependencies) {
    npmDevDependencies.forEach((dep) => {
      dependencies[dep.name] = dep.version;
    });
  }
  return dependencies;
}