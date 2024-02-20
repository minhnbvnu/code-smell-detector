async function deployService({ baseDir, serviceName, serviceRes, onlyConfig, tplPath, skipTrigger = false, useNas, assumeYes }) {
  const properties = (serviceRes.Properties || {});

  const internetAccess = 'InternetAccess' in properties ? properties.InternetAccess : null;
  const description = properties.Description;

  const vpcConfig = properties.VpcConfig;
  const nasConfig = properties.NasConfig;
  const logConfig = properties.LogConfig || {};
  const tracingConfig = properties.TracingConfig;
  const hasFunctionAsyncConfig = !!hasConfiguration(serviceRes, 'AsyncConfiguration');
  const hasCustomContainerConfig = !!hasConfiguration(serviceRes, 'CustomContainerConfig');

  const role = await generateServiceRole({
    serviceName, vpcConfig, nasConfig, logConfig,
    roleArn: properties.Role,
    policies: properties.Policies,
    hasFunctionAsyncConfig,
    hasCustomContainerConfig
  });

  await makeService({
    serviceName,
    role,
    internetAccess,
    description,
    logConfig,
    vpcConfig,
    nasConfig,
    tracingConfig
  });

  await deployFunctions({ baseDir, serviceName, serviceRes, onlyConfig, tplPath, skipTrigger, useNas, assumeYes });
}