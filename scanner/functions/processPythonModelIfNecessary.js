async function processPythonModelIfNecessary({ nasYmlPath, codeUri, runtime, baseDir,
  serviceName,
  remoteNasDirPrefix,
  serviceNasMappings
}) {

  if (!_.includes(['python2.7', 'python3'], runtime)) { return serviceNasMappings; }

  const absModelPath = path.resolve(codeUri, 'model');

  if (!await fs.pathExists(absModelPath)) { return serviceNasMappings; }

  const nasMappings = await extractNasMappingsFromNasYml(baseDir, serviceName);

  const modelMapping = nasMappings.find(arr => {
    return path.resolve(baseDir, arr.localNasDir) === absModelPath;
  });

  if (!_.isEmpty(modelMapping)) { return serviceNasMappings; }

  const remoteNasDir = `${remoteNasDirPrefix}model`;

  console.log(`
Fun has detected that there is a model folder. It is recommend to synchronize your model folder to NAS.
You can add the following configuration to ` + yellow(`'nasMapping.${serviceName}'`) + ` in ` + yellow(`${nasYmlPath}
`)

    + yellow(`
  - localNasDir: ${absModelPath}
    remoteNasDir: ${remoteNasDir}
    `)
    + `
After adding, fun is going to automatically synchronize the ` + yellow(`local`) + ` directory ${absModelPath} to ` + yellow(`remote`) + ` ${remoteNasDir}.
If these files ` + yellow('under') + ` model directory are used on your function code, you need to ${remoteNasDir} update these files path manully.
`);

  await promptForInputContinue('Please input enter to continue.');

  return await getNasMappingsFromNasYml(nasYmlPath);
}