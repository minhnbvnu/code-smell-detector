async function importFunction(serviceName, functionName, outputDir = '.', recursive = true, onlyConfig = false) {
  console.log('\nImport function resources:');
  const fullOutputDir = path.resolve(process.cwd(), outputDir);
  debug('Output Dir: %s', fullOutputDir);
  const templateFile = getTemplateFile(fullOutputDir);
  const functionMeta = await getFuncitonMeta(serviceName, functionName);
  debug('Function metadata: %s', functionMeta);

  let content;
  let serviceResource;
  let templateFilePath;

  const serviceMeta = await getServiceMeta(serviceName);
  serviceResource = await getServiceResource(serviceMeta, fullOutputDir, false, onlyConfig);

  if (templateFile) {
    content = templateFile.content;
    templateFilePath = templateFile.templateFilePath;

    if (existsService(serviceName, content)) {
      checkFunction(serviceName, functionName, content);
      Object.assign(content.Resources[serviceName], serviceResource);
      serviceResource = content.Resources[serviceName];
    } else {
      checkResource(serviceName, content);
    }
  } else {
    content = getTemplateHeader();
    templateFilePath = path.resolve(fullOutputDir, 'template.yml');
  }

  const functionResource = await getFunctionResource(serviceName, functionMeta, fullOutputDir, recursive, onlyConfig);
  serviceResource[functionName] = functionResource;
  content.Resources[serviceName] = serviceResource;
  outputTemplateFile(templateFilePath, content);
  console.log('Function import finished\n');
}