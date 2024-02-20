async function generateNasMappingsAndEnvs({
  baseDir,
  serviceName,
  functionName,
  runtime,
  codeUri,
  nasConfig
}) {
  const envs = {};

  const nasMappings = {};
  const nasMapping = [];

  const prefix = parseMountDirPrefix(nasConfig);
  // used for log
  const nasMappingPath = path.resolve(baseDir, '.nas.yml');
  const localSystemDependency = path.resolve(codeUri, SYSTEM_DEPENDENCY_PATH);

  if (await fs.pathExists(localSystemDependency)) { // system dependence
    const remoteNasDir = `${prefix}root`;

    nasMapping.push({
      localNasDir: path.relative(baseDir, localSystemDependency),
      remoteNasDir
    });

    nasMappings[serviceName] = nasMapping;

    Object.assign(envs, generateSystemNasEnvs(remoteNasDir));

    outputNasMappingLog(baseDir, nasMappingPath, localSystemDependency);
  }

  const dependencyMappings = runtimeDependencyMappings[runtime];

  for (const mapping of dependencyMappings) {
    const localDir = resolveLocalNasDir(runtime, baseDir, codeUri, mapping.localDir, serviceName, functionName);

    if (await fs.pathExists(localDir)) { // language local dependencies dir exist

      const remoteDir = `${prefix}${mapping.remoteDir}`;

      nasMapping.push({
        localNasDir: localDir,
        remoteNasDir: remoteDir
      });

      const resolveNasDir = mapping.pathSuffix ? remoteDir + '/' + mapping.pathSuffix : remoteDir;
      Object.assign(envs, generateNasEnv(mapping.defaultEnv, resolveNasDir, mapping.env));

      outputNasMappingLog(baseDir, nasMappingPath, localDir);
    }
  }

  nasMappings[serviceName] = nasMapping;

  return {
    envs,
    nasMappings,
    remoteNasDirPrefix: prefix
  };
}