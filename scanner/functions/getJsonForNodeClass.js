function getJsonForNodeClass(nodeClass) {
    var nodeSchema = {};
    if (nodeClass.static.hasOwnProperty('schema')) {
      nodeSchema.properties = _.clone(nodeClass.static.schema);
    }
    // add 'parent' attribute if the nodeClass has a parent
    return nodeSchema;
  }