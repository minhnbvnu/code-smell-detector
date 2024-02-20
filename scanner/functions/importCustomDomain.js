async function importCustomDomain(domainName, outputDir = '.', skipIfExists = true) {
  console.log('\nImport custom domain resources: ');
  let customDomainMetas = [];
  if (domainName) {
    const customDomainMeta = await getCustomDomainMeta(domainName);
    customDomainMetas.push(customDomainMeta);
  } else {
    customDomainMetas = await listCustomDomainMetas(domainName);
  }
  if (customDomainMetas.length === 0) {
    console.log(yellow('No custom domain name resources found.\n'));
    return;
  }
  const fullOutputDir = path.resolve(process.cwd(), outputDir);
  debug('Output Dir: %s', fullOutputDir);
  const templateFile = getTemplateFile(fullOutputDir);
  debug('Custom domain metadata: %s', customDomainMetas);

  let content;
  let templateFilePath;

  if (templateFile) {
    content = templateFile.content;
    templateFilePath = templateFile.templateFilePath;
  } else {
    content = getTemplateHeader();
    templateFilePath = path.resolve(fullOutputDir, 'template.yml');
  }

  checkCustomDomain(customDomainMetas, content, skipIfExists);
  for (const customDomainMeta of customDomainMetas) {
    const customDomain = customDomainMeta.customDomain;
    if (customDomainMeta.exists) {
      console.log(`${yellow('skip')} ${customDomain} - ${grey('Custom Domain')}`);
    } else {
      content.Resources[customDomain] = parseCustomDomainResource(customDomainMeta);
      console.log(`${green('✔')} ${customDomain} - ${grey('Custom Domain')}`);
    }
  }
  
  outputTemplateFile(templateFilePath, content);
  console.log('Custom domain import finished\n');
}