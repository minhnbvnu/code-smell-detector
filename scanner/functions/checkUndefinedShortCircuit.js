function checkUndefinedShortCircuit(node, reportFunc) {
                if (!node) {
                    return;
                }
                switch (node.type) {
                    case "LogicalExpression":
                        if (node.operator === "||" || node.operator === "??") {
                            checkUndefinedShortCircuit(node.right, reportFunc);
                        }
                        else if (node.operator === "&&") {
                            checkUndefinedShortCircuit(node.left, reportFunc);
                            checkUndefinedShortCircuit(node.right, reportFunc);
                        }
                        break;
                    case "SequenceExpression":
                        checkUndefinedShortCircuit(node.expressions[node.expressions.length - 1], reportFunc);
                        break;
                    case "ConditionalExpression":
                        checkUndefinedShortCircuit(node.consequent, reportFunc);
                        checkUndefinedShortCircuit(node.alternate, reportFunc);
                        break;
                    case "AwaitExpression":
                        checkUndefinedShortCircuit(node.argument, reportFunc);
                        break;
                    case "ChainExpression":
                        reportFunc(node);
                        break;
                    default:
                        break;
                }
            }