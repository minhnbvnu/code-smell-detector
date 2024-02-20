async function makeFunction(baseDir, {
  serviceName,
  functionName,
  description = '',
  handler,
  initializer = '',
  timeout = 3,
  initializationTimeout = 3,
  memorySize = 128,
  runtime = 'nodejs6',
  codeUri,
  cAPort,
  instanceType,
  asyncConfiguration,
  customContainerConfig,
  environmentVariables = {},
  instanceConcurrency,
  nasConfig,
  vpcConfig,
  layers = [],
  InstanceLifecycleConfig
}, onlyConfig, tplPath, useNas = false, assumeYes) {
  const fc = await getFcClient();
  
  const isNotCustomContainer = !isCustomContainerRuntime(runtime);
  var fn;
  try {
    fn = await fc.getFunction(serviceName, functionName);
  } catch (ex) {
    if (ex.code !== 'FunctionNotFound') {
      throw ex;
    }
  }

  if (!fn && onlyConfig) {
    throw new Error(`\nFunction '` + `${serviceName}` + '/' + `${functionName}` + `' was detected as the first deployment, and the code package had to be uploaded when creating the function. You can ` + yellow(`either`) + ` re-execute the command to remove the -u(--update-config)` + ` option ` + yellow(`or`) + ` execute 'fun deploy ${serviceName}/${functionName}' before doing so.`);
  }

  let code;

  if (!onlyConfig) { // ignore code

    if (codeUri && codeUri.startsWith('oss://')) { // oss://my-bucket/function.zip
      code = extractOssCodeUri(codeUri);
    } else if (isNotCustomContainer) {

      const fontsConfEnv = await generateFontsConfAndEnv(baseDir, codeUri);
      if (!_.isEmpty(fontsConfEnv)) {

        updateEnvironmentsInTpl({
          serviceName, functionName, tplPath,
          displayLog: false,
          tpl: await getTpl(tplPath),
          envs: DEFAULT_FONTS_CONFIG_ENV
        });

        Object.assign(environmentVariables, DEFAULT_FONTS_CONFIG_ENV);
      }

      console.log(`\t\tWaiting for packaging function ${functionName} code...`);
      const { base64, count, compressedSize } = await zipCode(baseDir, codeUri, runtime, functionName);

      const rs = await nasAutoConfigurationIfNecessary({
        nasFunctionName: functionName,
        nasServiceName: serviceName,
        codeUri: path.resolve(baseDir, codeUri),
        compressedSize, tplPath, runtime, nasConfig, vpcConfig, useNas, assumeYes
      });

      if (rs.stop) { return { tplChanged: rs.tplChanged }; }

      const convertedSize = bytes(compressedSize, {
        unitSeparator: ' '
      });

      if (!count || !compressedSize) {
        console.log(green(`\t\tThe function ${functionName} has been packaged.`));
      } else {
        console.log(green(`\t\tThe function ${functionName} has been packaged. A total of ` + yellow(`${count}`) + `${count === 1 ? ' file' : ' files'}` + ` were compressed and the final size was` + yellow(` ${convertedSize}`)));
      }

      code = {
        zipFile: base64
      };
    }
  }
  const transformedInstanceLifecycleConfig = transformInstanceLifecycleConfig(InstanceLifecycleConfig);

  const params = {
    description, handler, initializer, layers,
    timeout, initializationTimeout, memorySize,
    runtime, instanceConcurrency, instanceType,
    InstanceLifecycleConfig: transformedInstanceLifecycleConfig
  };
  if (isNotCustomContainer) {
    params.code = code;
    const confEnv = await resolveLibPathsFromLdConf(baseDir, codeUri);
    Object.assign(environmentVariables, confEnv);
  } else {
    params.CAPort = cAPort;
    params.CustomContainerConfig = customContainerConfig;
  }
  params.environmentVariables = addEnv(castEnvironmentVariables(environmentVariables), nasConfig);

  if (!fn) {
    params['functionName'] = functionName;
  }

  const streamPipe = barUtil.uploadProgress(params);

  try {
    if (!fn) {
      // create
      await fc.createFunction(serviceName, streamPipe);
    } else {
      // update
      await fc.updateFunction(serviceName, functionName, streamPipe);
    }
  } catch (ex) {
    if (ex.message.indexOf('timeout') !== -1) {
      throw new Error(`\nError message: ${ex.message}.\n\n` + red(`This error may be caused by network latency. You can set the client timeout to a larger value through 'fun config' and try again.`));
    }
    throw ex;
  }

  if (asyncConfiguration) {
    await makeDestination(serviceName, functionName, asyncConfiguration);
  }
  return {
    tplChanged: false
  };
}