function hasAllowedObjectExpression(memberExpression) {
  const {property, object} = memberExpression;
  if (property.type === 'Identifier' && ALLOWED_METHODS.has(property.name)) {
    return true;
  } else if (
    object.type === 'CallExpression' &&
    object.callee.type === 'MemberExpression'
  ) {
    return hasAllowedObjectExpression(object.callee);
  }
  return false;
}