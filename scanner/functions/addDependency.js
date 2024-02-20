function addDependency(configPath, dependency) {
  const config = getPackageConfig(configPath);
  const [name, version] = dependency;

  config.dependencies = config.dependencies || [];
  config.dependencies.push({ name, version });

  writePackageConfig(configPath, config);

  console.log(
    `Added ${name}@${version} to the dependencies list in ${configPath}`
  );
}