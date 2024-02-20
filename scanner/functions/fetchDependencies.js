function fetchDependencies(configPath) {
  if (!hasClioDependencies(configPath)) {
    logNoClioDeps(configPath);
    return;
  }

  return Promise.all(
    getPackageDependencies(configPath).map((dep) =>
      installDependency(configPath, `${dep.name}@${dep.version}`)
    )
  );
}