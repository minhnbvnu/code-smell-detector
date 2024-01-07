function compileNumericExpression(expression, context) {
  const op = expression.operator;
  const length = expression.args.length;

  const args = new Array(length);
  for (let i = 0; i < length; ++i) {
    args[i] = compileExpression(expression.args[i], context);
  }
  switch (op) {
    case Ops.Multiply: {
      return (context) => {
        let value = 1;
        for (let i = 0; i < length; ++i) {
          value *= args[i](context);
        }
        return value;
      };
    }
    case Ops.Divide: {
      return (context) => args[0](context) / args[1](context);
    }
    case Ops.Add: {
      return (context) => {
        let value = 0;
        for (let i = 0; i < length; ++i) {
          value += args[i](context);
        }
        return value;
      };
    }
    case Ops.Subtract: {
      return (context) => args[0](context) - args[1](context);
    }
    case Ops.Clamp: {
      return (context) => {
        const value = args[0](context);
        const min = args[1](context);
        if (value < min) {
          return min;
        }
        const max = args[2](context);
        if (value > max) {
          return max;
        }
        return value;
      };
    }
    case Ops.Mod: {
      return (context) => args[0](context) % args[1](context);
    }
    case Ops.Pow: {
      return (context) => Math.pow(args[0](context), args[1](context));
    }
    case Ops.Abs: {
      return (context) => Math.abs(args[0](context));
    }
    case Ops.Floor: {
      return (context) => Math.floor(args[0](context));
    }
    case Ops.Ceil: {
      return (context) => Math.ceil(args[0](context));
    }
    case Ops.Round: {
      return (context) => Math.round(args[0](context));
    }
    case Ops.Sin: {
      return (context) => Math.sin(args[0](context));
    }
    case Ops.Cos: {
      return (context) => Math.cos(args[0](context));
    }
    case Ops.Atan: {
      if (length === 2) {
        return (context) => Math.atan2(args[0](context), args[1](context));
      }
      return (context) => Math.atan(args[0](context));
    }
    case Ops.Sqrt: {
      return (context) => Math.sqrt(args[0](context));
    }
    default: {
      throw new Error(`Unsupported numeric operator ${op}`);
    }
  }
}