async function registerSingleHttpTrigger(app, router, serverPort, httpTrigger, debugPort, debugIde, baseDir, eager = false, debuggerPath, debugArgs, nasBaseDir, tplPath) {
  const { serviceName, serviceRes,
    functionName, functionRes,
    triggerName, triggerRes, path, domainName } = httpTrigger;

  debug('serviceName: ' + serviceName);
  debug('functionName: ' + functionName);
  debug('tiggerName: ' + triggerName);
  debug('triggerRes: ' + triggerRes);
  debug('path: ' + path);

  const isCustomDomain = path;

  const httpTriggerPrefix = `/2016-08-15/proxy/${serviceName}/${functionName}`;
  const customDomainPrefix = path;

  const endpointForRoute = isCustomDomain ? customDomainPrefix : `${httpTriggerPrefix}/*`;

  let endpointForDisplay = endpointForRoute;
  if (_.endsWith(endpointForDisplay, '*')) {
    endpointForDisplay = endpointForDisplay.substr(0, endpointForDisplay.length - 1);
  }

  const endpointPrefix = isCustomDomain ? '' : httpTriggerPrefix;

  const triggerProps = triggerRes.Properties;
  const httpMethods = triggerProps.Methods;
  const authType = triggerProps.AuthType;

  const codeUri = functionRes.Properties.CodeUri;
  const runtime = functionRes.Properties.Runtime;

  debug('debug port: %d', debugPort);

  await fc.detectLibrary(codeUri, runtime, baseDir, functionName);

  const tmpDir = await ensureTmpDir(null, tplPath, serviceName, functionName);

  const httpInvoke = new HttpInvoke(serviceName, serviceRes, functionName, functionRes, debugPort, debugIde, baseDir, tmpDir, authType, endpointPrefix, debuggerPath, debugArgs, nasBaseDir);
  if (eager) {
    await httpInvoke.initAndStartRunner();
  }
  app.use(setCORSHeaders);
  app.use(router);

  for (let method of httpMethods) {
    router[method.toLowerCase()](endpointForRoute, async (req, res) => {
      if (req.get('Upgrade') === 'websocket') {
        res.status(403).send('websocket not support');
        return;
      }
      await httpInvoke.invoke(req, res);
    });
  }
  printHttpTriggerTips(serverPort, serviceName, functionName, triggerName, endpointForDisplay, httpMethods, authType, domainName);
}