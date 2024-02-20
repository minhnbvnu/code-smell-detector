function bowerConfig() {
  return Promise.all([
    fsp.readFile(packagePath)
      .then(json => JSON.parse(json)),
    fsp.readFile(bowerTemplatePath)
      .then(templateString => template(templateString))
  ])
  .then(([pkg, compiledTemplate]) => compiledTemplate({ pkg }))
  .then(config => fsp.writeFile(bowerJson, config));
}