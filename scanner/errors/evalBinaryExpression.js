function evalBinaryExpression(op, a, b) {
  switch (op) {
    case OP["+"]:          return a + b;
    case OP["-"]:          return a - b;
    case OP["*"]:          return a * b;
    case OP["/"]:          return a / b;
    case OP["%"]:          return a % b;
    case OP["**"]:         return a ** b;
    case OP["<<"]:         return a << b;
    case OP[">>"]:         return a >> b;
    case OP[">>>"]:        return a >>> b;
    case OP["&"]:          return a & b;
    case OP["^"]:          return a ^ b;
    case OP["|"]:          return a | b;
    case OP["in"]:         return a in b;
    case OP["=="]:         return a == b;
    case OP["==="]:        return a === b;
    case OP["!="]:         return a != b;
    case OP["!=="]:        return a !== b;
    case OP[">"]:          return a > b;
    case OP[">="]:         return a >= b;
    case OP["<"]:          return a < b;
    case OP["<="]:         return a <= b;
    case OP["instanceof"]: return a instanceof b;
    default:
      throw new Error(`Invalid operator ${op}`);
    break;
  };
}