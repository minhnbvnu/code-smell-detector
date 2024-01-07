function withVarArgs(encoded, context, parsedArgs, typeHint) {
  const varName = encoded[1];
  if (typeof varName !== 'string') {
    throw new Error('Expected a string argument for var operation');
  }
  context.variables.add(varName);
  if (
    !('variables' in context.style) ||
    context.style.variables[varName] === undefined
  ) {
    return [new LiteralExpression(AnyType, varName)];
  }
  const initialValue = context.style.variables[varName];
  const arg = /** @type {LiteralExpression} */ (parse(initialValue, context));
  arg.value = varName;
  if (typeHint && !overlapsType(typeHint, arg.type)) {
    throw new Error(
      `The variable ${varName} has type ${typeName(
        arg.type,
      )} but the following type was expected: ${typeName(typeHint)}`,
    );
  }
  return [arg];
}