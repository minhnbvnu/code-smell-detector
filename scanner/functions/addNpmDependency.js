function addNpmDependency(configPath, dependency, flags) {
  const config = getPackageConfig(configPath);
  const [name, version] = dependency;

  if (flags.dev) {
    config.npm.devDependencies = config.npm.devDependencies || [];
    config.npm.devDependencies.push({ name, version });
  } else {
    config.npm.dependencies = config.npm.dependencies || [];
    config.npm.dependencies.push({ name, version });
  }

  writePackageConfig(configPath, config);

  console.log(
    `Added ${name}@${version} to the dependencies list in ${configPath}`
  );
}