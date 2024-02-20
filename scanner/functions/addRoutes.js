function addRoutes(resource) {
  resource = inflector.underscore(resource);
  var routesPath = root+'/config/routes.js';
  var templatePath = __dirname+'/../templates/scaffold/config/routes.js.hbs';
  var fragment = fs.renderTemplate(templatePath, {
    resource: resource,
    resources: inflector.pluralize(resource)
  });
  var src = fs.readFileSync(routesPath).toString();
  // TODO: this is ghetto, be more intelligent
  src = src.replace(/(App\.Router\.map\(function\(\) \{)/, '$1\n\n' + fragment);
  fs.writeFileSync(routesPath, src, 'force');
}