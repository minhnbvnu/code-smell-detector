async function processNasAutoToRosTemplate({ tpl, baseDir, tplPath,
  ossClient,
  bucketName
}) {
  const cloneTpl = _.cloneDeep(tpl);

  const servicesNeedUpdate = [];
  iterateResources(cloneTpl.Resources, SERVICE_RESOURCE, (serviceName, serviceRes) => {
    const nasConfig = (serviceRes.Properties || {}).NasConfig;
    const vpcConfig = (serviceRes.Properties || {}).VpcConfig;

    const nasAuto = isNasAutoConfig(nasConfig);
    const vpcAuto = isVpcAutoConfig(vpcConfig);

    if (nasAuto && !_.isEmpty(vpcConfig) && !vpcAuto) {
      throw new Error(`When 'NasConfig: Auto' is specified, 'VpcConfig' is not supported.`);
    }
    if (nasAuto && (vpcAuto || _.isEmpty(vpcConfig))) {
      servicesNeedUpdate.push({
        serviceName,
        serviceRes
      });
    }
  });

  if (_.isEmpty(servicesNeedUpdate)) { return cloneTpl; }

  const serviceNasMapping = await nas.convertTplToServiceNasMappings(detectNasBaseDir(tplPath), tpl);
  const mergedNasMapping = await nasSupport.mergeNasMappingsInNasYml(getNasYmlPath(tplPath), serviceNasMapping);

  let count = 0;
  let totalObjectNames = [];
  for (const { serviceName, serviceRes } of servicesNeedUpdate) {
    const serviceProp = (serviceRes.Properties || {});
    const nasConfig = serviceProp.NasConfig;

    const { userId, groupId } = getUserIdAndGroupId(nasConfig);

    serviceProp.VpcConfig = generateRosTemplateForVpcConfig();
    serviceProp.NasConfig = generateRosTemplateForNasConfig(serviceName, userId, groupId);

    const objectNames = [];
    for (const { localNasDir, remoteNasDir } of mergedNasMapping[serviceName]) {
      const srcPath = path.resolve(baseDir, localNasDir);

      if (!await fs.pathExists(srcPath)) {
        console.warn(`\n${srcPath} is not exist, skiping.`);
        continue;
      }
      if (isEmptyDir(srcPath)) {
        console.warn(`\n${srcPath} is empty directory, skiping.`);
        continue;
      }
      const prefix = path.relative(parseMountDirPrefix(nasConfig), remoteNasDir);
      const objectName = await zipToOss(ossClient, srcPath, null, 'nas.zip', prefix, tplPath, { level: 1 });

      if (!objectName) {
        console.warn(`\n${srcPath} is empty directory, skiping.`);
        continue;
      }
      objectNames.push(objectName);
      totalObjectNames.push(objectName);
    }

    if (_.isEmpty(objectNames)) {
      debug(`warning: There is no local NAS directory available under service: ${serviceName}.`);
      continue;
    }

    const customizer = (objValue, srcValue) => {
      return _.isEmpty(objValue) ? srcValue : _.merge(objValue, srcValue);
    };

    _.assignWith(cloneTpl, generateRosTemplateForEventOutputs(bucketName, objectNames, serviceName), customizer);

    Object.assign(cloneTpl.Resources, generateRosTemplateForNasCpInvoker(serviceName, bucketName, objectNames));

    count ++;
  }

  Object.assign(cloneTpl, generateRosTemplateForRegionMap());

  const needUpdateServiceNames = servicesNeedUpdate.map(s => s.serviceName);
  Object.assign(cloneTpl.Resources, generateRosTemplateForDefaultResources(needUpdateServiceNames, totalObjectNames.length > 0));

  if (_.isEmpty(totalObjectNames)) { return cloneTpl; }

  const codeUri = await uploadNasService(ossClient, tplPath);

  Object.assign(cloneTpl.Resources, generateRosTemplateForNasService(codeUri));
  Object.assign(cloneTpl.Resources, generateRosTemplateForWaitCondition(count));

  return _.merge(cloneTpl, generateRosTemplateForDefaultOutputs());
}