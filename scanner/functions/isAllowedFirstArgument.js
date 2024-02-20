function isAllowedFirstArgument(arg) {
  return isObjectExpression(arg) || isObjectCreateNull(arg) || isFunctionExpression(arg);
}