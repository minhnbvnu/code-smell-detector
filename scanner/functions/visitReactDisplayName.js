function visitReactDisplayName(traverse, object, path, state) {
  var left, right;

  if (object.type === Syntax.AssignmentExpression) {
    left = object.left;
    right = object.right;
  } else if (object.type === Syntax.Property) {
    left = object.key;
    right = object.value;
  } else if (object.type === Syntax.VariableDeclarator) {
    left = object.id;
    right = object.init;
  }

  if (left && left.type === Syntax.MemberExpression) {
    left = left.property;
  }
  if (left && left.type === Syntax.Identifier) {
    addDisplayName(left.name, right, state);
  }
}