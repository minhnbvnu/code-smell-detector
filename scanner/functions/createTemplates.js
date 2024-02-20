function createTemplates(resource, fields) {
  if (fields) fields.forEach(function(field) {
    field.title = inflector.humanize(field.name);
    field.id = inflector.underscore(field.name);
  });

  var modelName = inflector.underscore(inflector.singularize(resource));
  var saveDir = root + '/templates/';
  fs.writeTemplate(
    'scaffold',
    'templates/edit_resource.hbs',
    {
      title: inflector.humanize(resource),
      fields: fields
    },
    saveDir+'edit_'+resource+'.hbs'
  );
  var title = inflector.humanize(resource);
  fs.writeTemplate(
    'scaffold',
    'templates/resource.hbs',
    {
      title: title,
      fields: fields,
      editRoute: 'edit_' + inflector.underscore(resource),
      resourcesRoute: inflector.pluralize(modelName),
      resources: inflector.pluralize(title)
    },
    saveDir+resource+'.hbs'
  );
  fs.writeTemplate(
    'scaffold',
    'templates/resources.hbs',
    {
      title: inflector.pluralize(inflector.humanize(resource)),
      modelTitle: inflector.humanize(modelName),
      newPath: 'new_' + inflector.underscore(resource),
      resource: modelName,
      fields: fields
    },
    saveDir+inflector.pluralize(resource)+'.hbs'
  );
}