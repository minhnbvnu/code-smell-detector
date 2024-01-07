function compileLogicalExpression(expression, context) {
  const op = expression.operator;
  const length = expression.args.length;

  const args = new Array(length);
  for (let i = 0; i < length; ++i) {
    args[i] = compileExpression(expression.args[i], context);
  }
  switch (op) {
    case Ops.Any: {
      return (context) => {
        for (let i = 0; i < length; ++i) {
          if (args[i](context)) {
            return true;
          }
        }
        return false;
      };
    }
    case Ops.All: {
      return (context) => {
        for (let i = 0; i < length; ++i) {
          if (!args[i](context)) {
            return false;
          }
        }
        return true;
      };
    }
    case Ops.Not: {
      return (context) => !args[0](context);
    }
    default: {
      throw new Error(`Unsupported logical operator ${op}`);
    }
  }
}