function filesToTree(part) {

  var fileObjects = [];

  _.each(part.files, function(file) {

    if(_.isString(file)) {

      // If there is no objects in the array, or the latest object
      // is a part, create a non-part object to hold the files.
      if(fileObjects.length == 0 || _.last(fileObjects).label) {
        var vars = _.omit(part, ['files', 'parent', 'vars']);
        fileObjects.push({ files: [], parent:part, vars: vars });
      }

      _.last(fileObjects).files.push(file);
    }
    else if(file.label && file.files) {
      var vars = _.omit(file, ['files', 'parent', 'vars']);
      var child = filesToTree({ label: file.label, files: file.files, parent:part, vars: vars});
      fileObjects.push(child);
    }

  });

  part.files = fileObjects;
  return part;
}