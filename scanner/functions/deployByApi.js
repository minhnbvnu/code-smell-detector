async function deployByApi(baseDir, tpl, tplPath, context) {

  const remoteYml = await fetchRemoteYml(baseDir, tpl);

  const { resourceName, resourceRes } = await partialDeployment(context.resourceName, tpl);

  if (resourceName) {
    const { Type: resourceType = '' } = resourceRes;
    if (resourceType === definition.SERVICE_RESOURCE) {

      await showResourcesChanges({ Resources: { [resourceName]: resourceRes } }, remoteYml);

      if (!context.assumeYes && !await promptForConfirmContinue('Please confirm to continue.')) { return; }

      await deployTplService({ baseDir, tplPath,
        serviceName: resourceName,
        serviceRes: resourceRes,
        useNas: context.useNas,
        onlyConfig: context.onlyConfig
      });
    } else if (resourceType === definition.FLOW_RESOURCE) {
      await deployFlow(resourceName, resourceRes, tpl, context.parameterOverride, baseDir);
    } else {
      throw new Error(`${resourceName} can not be partial deploy`);
    }
    return;
  }

  await showResourcesChanges(tpl, remoteYml);

  if (!context.assumeYes && !await promptForConfirmContinue('Please confirm to continue.')) { return; }

  await deployLogs(tpl.Resources);

  for (const [name, resource] of Object.entries(tpl.Resources)) {
    if (resource.Type === 'Aliyun::Serverless::Service') {

      await deployTplService({ baseDir, tplPath,
        serviceName: name,
        serviceRes: resource,
        useNas: context.useNas,
        onlyConfig: context.onlyConfig,
        assumeYes: context.assumeYes
      });
    } else if (resource.Type === 'Aliyun::Serverless::Api') {
      console.log(`Waiting for api gateway ${name} to be deployed...`);
      await deployApigateway(name, {
        apiDefinition: resource,
        template: tpl,
        tplPath
      });
      console.log(green(`api gateway ${name} deploy success\n`));
    } else if (resource.Type === 'Aliyun::Serverless::TableStore') {
      console.log(`Waiting for table store ${name} to be deployed...`);
      await deployTablestore(name, resource);
      console.log(green(`table store ${name} deploy success\n`));
    } else if (resource.Type === 'Aliyun::Serverless::Log') {
      // ignore, done by deployLogs
    } else if (resource.Type === 'Aliyun::Serverless::CustomDomain') {
      const { domainName, routes } = await processTemporaryDomainIfNecessary(name, resource, tpl.Resources);

      console.log(`Waiting for custom domain ${name} to be deployed...`);
      await deployCustomDomain(domainName, resource, routes);
      console.log(green(`custom domain ${name} deploy success\n`));
    } else if (resource.Type === 'Aliyun::Serverless::MNSTopic') {
      console.log(`Waiting for Mns topic ${name} to be deployed...`);
      await deployMNSTopic(name, resource);
      console.log(green(`table store ${name} deploy success\n`));
    } else if (resource.Type === 'Aliyun::Serverless::Flow') {
      console.log(`Waiting for flow ${name} to be deployed...`);
      await deployFlow(name, resource, tpl, context.parameterOverride, baseDir);
      console.log(green(`flow ${name} deploy success\n`));
    } else {
      console.log('unknown resource %s', name);
    }
  }
}