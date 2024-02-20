async function importFlowResource({
  fnfName,
  outputDir = '.',
  definitionYmlPrefix,
  skipIfExists = false
}) {
  if (!fnfName) {
    console.log('fnfName is missing.');
    return;
  }
  console.log('\nImport flow resources...');

  const rs = await getFlowResource(fnfName);

  const absOutputDir = resolveOutputDir(null, outputDir);

  const { content, templateFilePath } = getDefaultTemplate(absOutputDir);

  if (!_.isEmpty(content.Resources[fnfName])) {
    if (skipIfExists) {
      console.log(`Flow ${fnfName} is already exist, skip.`);
      return;
    }
    throw new Error(`Flow ${fnfName} is already exist.`);
  }

  const definitionYmlPath = path.join(absOutputDir, `${definitionYmlPrefix ? definitionYmlPrefix : fnfName}.flow.yml`);

  content.Resources[fnfName] = parsingFlowResource(rs, definitionYmlPath, outputDir);

  outputTemplateFile(templateFilePath, content);

  console.log(`${green('✔')} flow import finished`);
}