function isEvaluatedString(node) {
                if ((node.type === "Literal" && typeof node.value === "string") ||
                    node.type === "TemplateLiteral") {
                    return true;
                }
                if (node.type === "BinaryExpression" && node.operator === "+") {
                    return isEvaluatedString(node.left) || isEvaluatedString(node.right);
                }
                return false;
            }