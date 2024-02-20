function renderRestExpression(accessorExpression, excludedProperties) {
  var excludedNames = getPropertyNames(excludedProperties);
  if (!excludedNames.length) {
    return getSimpleShallowCopy(accessorExpression);
  }
  return getRestFunctionCall(
    accessorExpression,
    '{' + excludedNames.join(':1,') + ':1}'
  );
}