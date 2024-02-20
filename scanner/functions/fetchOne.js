function fetchOne(ref, config) {
  const dest = config.generateModuleCachePath(ref);

  return fetchOneRemote(ref.remote, ref.name, ref.version, dest, config);
}