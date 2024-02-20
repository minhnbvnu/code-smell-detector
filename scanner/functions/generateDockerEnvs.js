async function generateDockerEnvs(baseDir, serviceName, serviceProps, functionName, functionProps, debugPort, httpParams, nasConfig, ishttpTrigger, debugIde, debugArgs) {
  const envs = {};

  if (httpParams) {
    Object.assign(envs, {
      'FC_HTTP_PARAMS': httpParams
    });
  }

  const confEnv = await resolveLibPathsFromLdConf(baseDir, functionProps.CodeUri);

  Object.assign(envs, confEnv);

  const runtime = functionProps.Runtime;

  if (debugPort && !debugArgs) {
    const debugEnv = generateDebugEnv(runtime, debugPort, debugIde);

    Object.assign(envs, debugEnv);
  } else if (debugArgs) {
    Object.assign(envs, {
      DEBUG_OPTIONS: debugArgs
    });
  }

  if (ishttpTrigger && (runtime === 'java8' || runtime === 'java11')) {
    envs['fc_enable_new_java_ca'] = 'true';
  }

  Object.assign(envs, generateFunctionEnvs(functionProps));

  const profile = await getProfile();

  Object.assign(envs, {
    'local': true,
    'FC_ACCESS_KEY_ID': profile.accessKeyId,
    'FC_ACCESS_KEY_SECRET': profile.accessKeySecret,
    'FC_SECURITY_TOKEN': profile.securityToken,
    'FC_ACCOUNT_ID': profile.accountId,
    'FC_REGION': profile.defaultRegion,
    'FC_FUNCTION_NAME': functionName,
    'FC_HANDLER': functionProps.Handler,
    'FC_MEMORY_SIZE': functionProps.MemorySize || 128,
    'FC_TIMEOUT': functionProps.Timeout || 3,
    'FC_INITIALIZER': functionProps.Initializer,
    'FC_INITIALIZATION_TIMEOUT': functionProps.InitializationTimeout || 3,
    'FC_SERVICE_NAME': serviceName,
    'FC_SERVICE_LOG_PROJECT': ((serviceProps || {}).LogConfig || {}).Project,
    'FC_SERVICE_LOG_STORE': ((serviceProps || {}).LogConfig || {}).Logstore
  });

  if (isCustomContainerRuntime(functionProps.Runtime)) {
    return envs;
  }
  return addEnv(envs, nasConfig);
}