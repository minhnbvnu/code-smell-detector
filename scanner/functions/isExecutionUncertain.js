function isExecutionUncertain(type, key) {
  switch (type) {
    case "LogicalExpression":
      return key === "right";

    case "ConditionalExpression":
    case "IfStatement":
      return key === "consequent" || key === "alternate";

    case "WhileStatement":
    case "DoWhileStatement":
    case "ForInStatement":
    case "ForOfStatement":
      return key === "body";

    case "ForStatement":
      return key === "body" || key === "update";

    case "SwitchStatement":
      return key === "cases";

    case "TryStatement":
      return key === "handler";

    case "AssignmentPattern":
      return key === "right";

    case "OptionalMemberExpression":
      return key === "property";

    case "OptionalCallExpression":
      return key === "arguments";

    default:
      return false;
  }
}