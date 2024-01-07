function compileMatchExpression(expression, context) {
  const length = expression.args.length;
  const args = new Array(length);
  for (let i = 0; i < length; ++i) {
    args[i] = compileExpression(expression.args[i], context);
  }
  return (context) => {
    const value = args[0](context);
    for (let i = 1; i < length; i += 2) {
      if (value === args[i](context)) {
        return args[i + 1](context);
      }
    }
    return args[length - 1](context);
  };
}