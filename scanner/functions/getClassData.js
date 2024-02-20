function getClassData(node, state, source, commentsForFile, linesForFile) {
  var methods = [];
  invariant(node.body.type === Syntax.ClassBody, 'Expected ClassBody');
  node.body.body.forEach(function(bodyItem) {
    if (bodyItem.type === Syntax.MethodDefinition) {
      if (bodyItem.value.type === Syntax.FunctionExpression) {
        var methodData =
          getFunctionData(bodyItem.value, bodyItem, state, source,
            commentsForFile, linesForFile);
        methodData.name = bodyItem.key.name;
        methodData.source = source.substring.apply(source, bodyItem.range);
        if (bodyItem.static) {
          methodData.modifiers.push('static');
        }
        methods.push(methodData);
      }
    }
  });
  var data = {
    name: node.id.name,
    docblock: getDocBlock(node, commentsForFile, linesForFile),
    methods: methods,
  };
  if (node.superClass && node.superClass.type === Syntax.Identifier) {
    data.superClass = node.superClass.name;
  }
  if (node.typeParameters) {
    data.tparams = node.typeParameters.params.map(function(x) {
      return x.name;
    });
  }
  return data;
}