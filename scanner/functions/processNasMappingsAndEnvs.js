async function processNasMappingsAndEnvs({ tpl, tplPath, runtime, codeUri, baseDir,
  serviceName,
  functionName,
  convertedNasConfig
}) {

  const { serviceRes } = definition.findFunctionByServiceAndFunctionName(tpl.Resources, serviceName, functionName);

  const { envs, nasMappings, remoteNasDirPrefix } = await generateNasMappingsAndEnvs({
    baseDir, runtime, codeUri,
    serviceName: serviceName,
    functionName: functionName,
    nasConfig: convertedNasConfig || (serviceRes.Properties || {}).NasConfig
  });

  const appendContet = `  <dir>${remoteNasDirPrefix}${FONTS_MAPPING.remoteDir}</dir>`;
  await generateFontsConfAndEnv(baseDir, codeUri, appendContet);

  const localDirs = _.map(runtimeDependencyMappings[runtime], mapping => path.join(codeUri, mapping.localDir));

  if (_.isEmpty(nasMappings[serviceName])) {
    throw new Error(red(`\nFun detects that your dependencies are not included in path ${localDirs} or ${path.resolve(codeUri, SYSTEM_DEPENDENCY_PATH)}`));
  }

  const nasMappingsObj = await saveNasMappings(getNasYmlPath(tplPath), nasMappings);

  const { updatedEnvsTpl, tplChanged } = await processEnvironments({ baseDir, codeUri, tplPath, tpl, envs, runtime, serviceName, functionName });

  return {
    tplChanged,
    remoteNasDirPrefix,
    updatedTpl: updatedEnvsTpl,
    serviceNasMappings: nasMappingsObj
  };
}