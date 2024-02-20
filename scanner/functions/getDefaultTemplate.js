function getDefaultTemplate(absOutputDir) {
  const templateFile = getTemplateFile(absOutputDir);
  const templateFilePath = path.resolve(absOutputDir, 'template.yml');

  if (templateFile) {
    return {
      content: templateFile.content,
      templateFilePath
    };
  }

  return {
    content: getTemplateHeader(),
    templateFilePath
  };
}