async function deployNasService(baseDir, tpl, service, tplPath) {
  console.log('\nstart fun nas init...');

  const zipCodePath = path.resolve(__dirname, '../utils/fun-nas-server/dist/fun-nas-server.zip');

  if (!await fs.pathExists(zipCodePath)) {
    throw new Error('could not find ../utils/fun-nas-server/dist/fun-nas-server.zip');
  }
  const versionFilePath = path.resolve(__dirname, '../utils/fun-nas-server/dist/VERSION');
  if (!await fs.pathExists(versionFilePath)) {
    throw new Error('could not find ../utils/fun-nas-server/dist/VERSION');
  }
  const version = (await fs.readFile(versionFilePath)).toString();

  let permTipArr = [];
  for (const { serviceName, serviceRes } of definition.findServices(tpl.Resources)) {

    if (service && service !== serviceName) { continue; }

    const serviceProps = (serviceRes || {}).Properties;
    const nasConfig = (serviceProps || {}).NasConfig;
    const vpcConfig = (serviceProps || {}).VpcConfig;

    if (!nasConfig) { continue; }

    const nasServiceName = constants.FUN_NAS_SERVICE_PREFIX + serviceName;

    console.log(`checking if ${nasServiceName} needs to be deployed...`);

    if (await isNasServerStale(nasServiceName, nasConfig, version)) {

      console.log(`Waiting for service ${nasServiceName} to be deployed...`);
      await require('../deploy/deploy-by-tpl').deployService({
        baseDir, tplPath,
        serviceName: nasServiceName,
        serviceRes: generateNasServiceRes(serviceName, vpcConfig, nasConfig, zipCodePath),
        onlyConfig: false, skipTrigger: false, useNas: false
      });
      console.log(green(`service ${nasServiceName} deploy success\n`));

      const nasMappings = await nas.convertNasConfigToNasMappings(nas.getDefaultNasDir(baseDir), nasConfig, serviceName);
      const nasMappingsFromNasYml = await extractNasMappingsFromNasYml(baseDir, serviceName);

      const mergedNasMappings = _.unionWith([...nasMappings, ...nasMappingsFromNasYml], _.isEqual);

      console.log(green(`Create local NAS directory of service ${serviceName}:`));

      const nasId = nas.getNasIdFromNasConfig(nasConfig);
      const nasHttpTriggerPath = getNasHttpTriggerPath(serviceName);
      // 延迟 1 秒，为保证 nas server 部署完成并成功执行
      // TODO: 利用类似部署 ID 的标识来验证部署的的成功
      await sleep(1000);

      for (let mappings of mergedNasMappings) {
        console.log(`\t${path.resolve(baseDir, mappings.localNasDir)}`);
        const statsRes = await statsRequest(mappings.remoteNasDir, nasHttpTriggerPath);
        const stats = statsRes.data;
        const permTip = checkWritePerm(stats, nasId, mappings.remoteNasDir);
        if (permTip) {
          permTipArr.push(permTip);
        }
      }
    } else {
      console.log(`skip deploying ${nasServiceName}, which has been deployed`);
    }
  }
  for (let permTip of permTipArr) {
    console.log(red(`\nWarning: fun nas init: ${permTip}`));
  }
  console.log(green('fun nas init Success\n'));
}