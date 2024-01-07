function compileComparisonExpression(expression, context) {
  const op = expression.operator;
  const left = compileExpression(expression.args[0], context);
  const right = compileExpression(expression.args[1], context);
  switch (op) {
    case Ops.Equal: {
      return (context) => left(context) === right(context);
    }
    case Ops.NotEqual: {
      return (context) => left(context) !== right(context);
    }
    case Ops.LessThan: {
      return (context) => left(context) < right(context);
    }
    case Ops.LessThanOrEqualTo: {
      return (context) => left(context) <= right(context);
    }
    case Ops.GreaterThan: {
      return (context) => left(context) > right(context);
    }
    case Ops.GreaterThanOrEqualTo: {
      return (context) => left(context) >= right(context);
    }
    default: {
      throw new Error(`Unsupported comparison operator ${op}`);
    }
  }
}