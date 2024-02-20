function evalUnaryExpression(op, ctx, a) {
  switch (op) {
    case OP["+"]:      return +a;
    case OP["-"]:      return -a;
    case OP["!"]:      return !a;
    case OP["~"]:      return ~a;
    case OP["void"]:   return void a;
    case OP["typeof"]: return typeof a;
    // handled outside
    case OP["delete"]: return a;
    default:
      throw new Error(`Invalid operator ${op}`);
    break;
  };
}