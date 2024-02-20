async function deployTplService({ baseDir, serviceName, serviceRes, onlyConfig, tplPath, useNas, assumeYes }) {

  const beforeDeployLog = onlyConfig ? 'config to be updated' : 'to be deployed';
  const afterDeployLog = onlyConfig ? 'config update success' : 'deploy success';

  console.log(`Waiting for service ${serviceName} ${beforeDeployLog}...`);
  await deployService({ baseDir, serviceName, serviceRes, onlyConfig, tplPath, useNas, assumeYes });
  console.log(green(`service ${serviceName} ${afterDeployLog}\n`));
}