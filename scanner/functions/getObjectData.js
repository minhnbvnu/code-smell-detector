function getObjectData(node, state, source, scopeChain,
    commentsForFile, linesForFile) {
  var methods = [];
  var properties = [];
  var classes = [];
  var superClass = null;
  node.properties.forEach(function(property) {
    if (property.type === Syntax.SpreadProperty) {
      if (property.argument.type === Syntax.Identifier) {
        superClass = property.argument.name;
      }
      return;
    }

    switch (property.value.type) {
    case Syntax.FunctionExpression:
      var methodData = getFunctionData(property.value, property, state, source,
        commentsForFile, linesForFile);
      methodData.name = property.key.name || property.key.value;
      methodData.source = source.substring.apply(source, property.range);
      methodData.modifiers.push('static');
      methods.push(methodData);
      break;
    case Syntax.Identifier:
      var expr = resolveToValue(
        property.value,
        scopeChain
      );
      if (expr) {
        if (expr.type === Syntax.FunctionDeclaration ||
            expr.type === Syntax.FunctionExpression) {
          var functionData =
            getFunctionData(expr, property, state, source, commentsForFile,
              linesForFile);
          functionData.name = property.key.name || property.key.value;
          functionData.modifiers.push('static');
          methods.push(functionData);
          break;
        } else {
          property.value = expr;
        }
      }
      /* falls through */
    default:
      var propertySource = '';
      var valueRange = property.value.range;
      if (valueRange[1] - valueRange[0] < MAX_PROPERTY_SOURCE_LENGTH) {
        propertySource = source.substring.apply(source, valueRange);
      }
      var docBlock = getDocBlock(property, commentsForFile, linesForFile);
      /* CodexVarDef: modifiers, type, name, default, docblock */
      if (property.value.type === Syntax.ClassDeclaration) {
        var type = {name: property.value.id.name};
        var classData = getClassData(property.value, state, source, commentsForFile, linesForFile);
        classData.ownerProperty = property.key.name;
        classes.push(classData);
      } else {
        var type = {name: property.value.type};
      }
      var propertyData = {
        // Cast to String because this can be a Number
        // Could also be a String literal (e.g. "key") hence the value
        name: String(property.key.name || property.key.value),
        type,
        docblock: docBlock || '',
        source: source.substring.apply(source, property.range),
        modifiers: ['static'],
        propertySource,
      };
      properties.push(propertyData);
      break;
    }
  });
  return {
    methods: methods,
    properties: properties,
    classes: classes,
    superClass: superClass
  };
}