function compileCaseExpression(expression, context) {
  const length = expression.args.length;
  const args = new Array(length);
  for (let i = 0; i < length; ++i) {
    args[i] = compileExpression(expression.args[i], context);
  }
  return (context) => {
    for (let i = 0; i < length - 1; i += 2) {
      const condition = args[i](context);
      if (condition) {
        return args[i + 1](context);
      }
    }
    return args[length - 1](context);
  };
}