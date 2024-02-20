async function importService(serviceName, outputDir = '.', recursive = true, onlyConfig = false, skipIfExists = true) {
  console.log('\nImport service resources: ');
  let serviceMetas = [];
  if (serviceName) {
    const serviceMeta = await getServiceMeta(serviceName);
    serviceMetas.push(serviceMeta);
  } else {
    serviceMetas = await listServiceMetas();
  }
  if (serviceMetas.length === 0) {
    console.log(yellow('No service resources found.\n'));
    return;
  }
  const fullOutputDir = path.resolve(process.cwd(), outputDir);
  debug('Output Dir: %s', fullOutputDir);
  debug('Custom domain metadata: %s', serviceMetas);
  const templateFile = getTemplateFile(fullOutputDir);

  let content;
  let templateFilePath;

  if (templateFile) {
    content = templateFile.content;
    templateFilePath = templateFile.templateFilePath;
    checkResource(serviceName, content);
  } else {
    content = getTemplateHeader();
    templateFilePath = path.resolve(fullOutputDir, 'template.yml');
  }

  checkService(serviceMetas, content, skipIfExists);
  for (const serviceMeta of serviceMetas) {
    const serviceName = serviceMeta.serviceName;
    if (serviceMeta.exists) {
      console.log(`${yellow('skip')} ${serviceName} - ${grey('Service')}`);
    } else {
      content.Resources[serviceName] = await getServiceResource(serviceMeta, fullOutputDir, recursive, onlyConfig);
    }
  }

  outputTemplateFile(templateFilePath, content);
  console.log('Service import finished\n');
}