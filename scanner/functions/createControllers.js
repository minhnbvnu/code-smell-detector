function createControllers(resource) {
  var modelRoute = inflector.underscore(inflector.singularize(resource));
  var saveDir = root+'/controllers/';
  var underscored = inflector.underscore(resource);
  var objectName = inflector.objectify(resource)+'Controller';
  fs.writeTemplate(
    'scaffold',
    'controllers/edit_resource_controller.js', 
    {
      objectName: 'Edit' + objectName,
      modelRoute: modelRoute
    },
    saveDir+'edit_'+underscored+'_controller.js'
  );
  fs.writeTemplate(
    'scaffold',
    'controllers/new_resource_controller.js',
    {
      editObjectName: 'Edit' + objectName,
      editObjectPath: './edit_' + underscored + '_controller',
      objectName: 'New' + objectName
    },
    saveDir+'new_'+underscored+'_controller.js'
  );
  fs.writeTemplate(
    'scaffold',
    'controllers/resource_controller.js',
    {
      objectName: objectName,
      resourcesRoute: inflector.pluralize(modelRoute)
    },
    saveDir+underscored+'_controller.js'
  );
}