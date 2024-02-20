function hasClioDependencies(configPath) {
  const dependencies = getPackageDependencies(configPath);
  return !!dependencies && !!Object.keys(dependencies).length;
}