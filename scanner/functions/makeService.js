async function makeService({
  serviceName,
  role,
  description,
  internetAccess = true,
  logConfig = {},
  vpcConfig,
  nasConfig,
  tracingConfig
}) {
  const fc = await getFcClient();

  let service;
  await promiseRetry(async (retry, times) => {
    try {
      service = await fc.getService(serviceName);
    } catch (ex) {
      if (ex.code === 'AccessDenied' || !ex.code || ex.code === 'ENOTFOUND') {
        if (ex.message.indexOf('FC service is not enabled for current user') !== -1) {
          console.error(red(`\nFC service is not enabled for current user. Please enable FC service before using fun.\nYou can enable FC service on this page https://www.aliyun.com/product/fc .\n`));
        } else {
          console.error(red(`\nThe accountId you entered is incorrect. You can only use the primary account id, whether or not you use a sub-account or a primary account ak. You can get primary account ID on this page https://account.console.aliyun.com/#/secure .\n`));
        }
        throw ex;
      } else if (ex.code !== 'ServiceNotFound') {
        debug('error when getService, serviceName is %s, error is: \n%O', serviceName, ex);

        console.log(red(`\tretry ${times} times`));
        retry(ex);
      }
    }
  });

  const resolvedLogConfig = await transformLogConfig(logConfig);

  const resolvedTracingConfig = await transformTracingConfig(tracingConfig);

  const options = {
    description,
    role,
    tracingConfig: resolvedTracingConfig,
    logConfig: resolvedLogConfig
  };

  if (internetAccess !== null) {
    // vpc feature is not supported in some region
    Object.assign(options, {
      internetAccess
    });
  }

  const isNasAuto = definition.isNasAutoConfig(nasConfig);
  const isVpcAuto = definition.isVpcAutoConfig(vpcConfig);

  if (!_.isEmpty(vpcConfig) || isNasAuto) {

    if (isVpcAuto || (_.isEmpty(vpcConfig) && isNasAuto)) {
      console.log('\tusing \'VpcConfig: Auto\', Fun will try to generate related vpc resources automatically');
      vpcConfig = await vpc.createDefaultVpcIfNotExist();
      console.log(green('\tgenerated auto VpcConfig done: ', JSON.stringify(vpcConfig)));

      debug('generated vpcConfig: %j', vpcConfig);
    }
  }

  Object.assign(options, {
    vpcConfig: vpcConfig || defaultVpcConfig
  });

  if (isNasAuto) {
    const vpcId = vpcConfig.vpcId || vpcConfig.VpcId;
    const vswitchIds = vpcConfig.vswitchIds || vpcConfig.VSwitchIds;

    console.log('\tusing \'NasConfig: Auto\', Fun will try to generate related nas file system automatically');
    nasConfig = await nas.generateAutoNasConfig(serviceName, vpcId, vswitchIds, nasConfig.UserId, nasConfig.GroupId);
    console.log(green('\tgenerated auto NasConfig done: ', JSON.stringify(nasConfig)));
  }

  Object.assign(options, {
    nasConfig: nasConfig || defaultNasConfig
  });

  await promiseRetry(async (retry, times) => {

    try {
      service = await retryUntilSlsCreated(serviceName, options, !service, fc);
    } catch (ex) {
      if (ex.code === 'AccessDenied' || isSlsNotExistException(ex)) {
        throw ex;
      }
      debug('error when createService or updateService, serviceName is %s, options is %j, error is: \n%O', serviceName, options, ex);

      console.log(red(`\tretry ${times} times`));
      retry(ex);
    }
  });

  // make sure nas dir exist
  if (serviceName !== FUN_GENERATED_SERVICE
    && !_.isEmpty(nasConfig)
    && !_.isEmpty(nasConfig.MountPoints)) {

    await ensureNasDirExist({
      role, vpcConfig, nasConfig
    });
  }

  return service;
}