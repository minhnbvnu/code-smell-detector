async function fetchRemoteYml(baseDir, tpl) {
  const importTmpDir = path.join(baseDir, '.fun', 'tmp', 'deploy');
  const importYmlPath = path.join(importTmpDir, 'template.yml');

  await fs.ensureDir(importTmpDir);
  await fs.remove(importYmlPath);

  const services = definition.findServices(tpl.Resources);

  console.log('Collecting your services information, in order to caculate devlopment changes...');

  for (const service of services) {
    const originConsoleLog = console.log;
    console.log = debug;
    try {
      await importService(service.serviceName, importTmpDir, true, true, true);
    } catch (e) {
      debug('import service error', e);
    }
    console.log = originConsoleLog;
  }

  if (!await fs.pathExists(importYmlPath)) {
    return {
      Resources: {}
    };
  }

  return await getTpl(importYmlPath);
}