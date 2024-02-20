function isReturnAssignException(node) {
                if (!EXCEPT_RETURN_ASSIGN || !isInReturnStatement(node)) {
                    return false;
                }
                if (node.type === "ReturnStatement") {
                    return node.argument && containsAssignment(node.argument);
                }
                if (node.type === "ArrowFunctionExpression" && node.body.type !== "BlockStatement") {
                    return containsAssignment(node.body);
                }
                return containsAssignment(node);
            }