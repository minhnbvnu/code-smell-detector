function getTemplateFile(fullOutputDir) {
  const doGetTemplateFile = fileName => {
    const templateFilePath = path.resolve(fullOutputDir, fileName);
    if (fs.existsSync(templateFilePath)) {
      const defautContent = getTemplateHeader();
      let content = yaml.safeLoad(fs.readFileSync(templateFilePath, 'utf8'));
      if (content) {
        if (content.ROSTemplateFormatVersion === undefined) {
          throw new Error(red('The template file format in the current directory is incorrect.'));
        }
        content.Resources = content.Resources || defautContent.Resources;
        content.ROSTemplateFormatVersion = content.ROSTemplateFormatVersion || defautContent.ROSTemplateFormatVersion;
        if (typeof content.Transform === 'string') {
          if (content.Transform !== defautContent.Transform) {
            content.Transform = [ content.Transform, defautContent.Transform ];
          }
        } else if (Array.isArray(content.Transform)) {
          if (!content.Transform.includes(defautContent.Transform)) {
            content.Transform.push(defautContent.Transform);
          }
        } else {
          content.Transform = defautContent.Transform;
        }
      } else {
        content = defautContent;
      }
      return {
        templateFilePath,
        content
      };
    }
  };
  const result = doGetTemplateFile('template.yml');
  if (result) {
    return result;
  }
  return doGetTemplateFile('template.yaml');
}