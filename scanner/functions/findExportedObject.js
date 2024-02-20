function findExportedObject(ast, recast) {
  var objPath;
  recast.visit(ast, {
    visitAssignmentExpression: function(path) {
      if (!objPath && docgen.utils.isExportsOrModuleAssignment(path)) {
        objPath = docgen.utils.resolveToValue(path.get('right'));
      }
      return false;
    }
  });

  if (objPath) {
    // Hack: This is easier than replicating the default propType
    // handler.
    // This converts any expression, e.g. `foo` to an object expression of
    // the form `{propTypes: foo}`
    var b = recast.types.builders;
    var nt = recast.types.namedTypes;
    var obj = objPath.node;

    // Hack: This is converting calls like
    //
    //    Object.apply(Object.create(foo), { bar: 42 })
    //
    // to an AST representing an object literal:
    //
    //    { ...foo, bar: 42 }
    if (nt.CallExpression.check(obj) &&
        recast.print(obj.callee).code === 'Object.assign') {
      obj = objPath.node.arguments[1];
      var firstArg = objPath.node.arguments[0];
      if (recast.print(firstArg.callee).code === 'Object.create') {
        firstArg = firstArg.arguments[0];
      }
      obj.properties.unshift(
        b.spreadProperty(firstArg)
      );
    }

    objPath.replace(b.objectExpression([
      b.property('init', b.literal('propTypes'), obj)
    ]));
  }
  return objPath;
}