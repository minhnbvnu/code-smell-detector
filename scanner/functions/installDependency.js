async function installDependency(configPath, id, flags = {}) {
  if (flags.npm) {
    return installNpmDependency(configPath, id, flags);
  }
  const { url, tag } = parsePackageId(id);
  const dependencyCfg = await fetchPackageFromGit(
    configPath,
    { url, tag },
    flags.force
  );
  addDependency(configPath, [url, tag]);
  // install dependencies of dependencies, and their dependencies
  const toInstall = [];
  const queueDeps = (cfg) => {
    for (const { name, version } of cfg.dependencies || []) {
      toInstall.push({ url: name, tag: version });
    }
  };
  queueDeps(dependencyCfg);
  while (toInstall.length) {
    const { url, tag } = toInstall.pop();
    const dependencyCfg = await fetchPackageFromGit(
      configPath,
      { url, tag },
      flags.force
    );
    queueDeps(dependencyCfg);
  }
}