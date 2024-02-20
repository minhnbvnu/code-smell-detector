async function processNasAutoConfiguration({ tpl, tplPath, runtime, codeUri, convertedNasConfig, stage,
  serviceName,
  functionName
}) {

  const baseDir = getBaseDir(tplPath);

  await processCustomRuntimeIfNecessary(runtime, codeUri, baseDir);

  const rs = await processNasMappingsAndEnvs({
    tpl,
    tplPath, runtime, codeUri, baseDir,
    serviceName,
    functionName,
    convertedNasConfig
  });

  if (stage === 'package') { return rs.tplChanged; }

  const serviceNasMappings = await processPythonModelIfNecessary({
    codeUri, runtime, baseDir,
    serviceName: serviceName,
    nasYmlPath: getNasYmlPath(tplPath),
    remoteNasDirPrefix: rs.remoteNasDirPrefix,
    serviceNasMappings: rs.serviceNasMappings
  });

  // fun nas cp
  await nasCpFromlocalNasDirToRemoteNasDir(tpl, tplPath, baseDir, serviceName, serviceNasMappings[serviceName]);

  console.log(yellow(`\nFun has automatically uploaded your code dependency to NAS, then fun will use 'fun deploy ${serviceName}/${functionName}' to redeploy.`));

  console.log(`Waiting for service ${serviceName} to be deployed...`);
  const partialDeploy = await require('./deploy/deploy-by-tpl').partialDeployment(`${serviceName}/${functionName}`, tpl);

  if (partialDeploy.resourceName) {
    // can not use baseDir, should use tpl dirname
    await require('./deploy/deploy-by-tpl').deployService({
      baseDir: path.dirname(tplPath),
      serviceName: partialDeploy.resourceName,
      serviceRes: partialDeploy.resourceRes,
      onlyConfig: false, tplPath, skipTrigger: true, useNas: false
    });
  }

  return rs.tplChanged;
}