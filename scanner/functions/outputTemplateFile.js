function outputTemplateFile(templateFilePath, content) {
  fs.writeFileSync(templateFilePath, yaml.safeDump(content));
}