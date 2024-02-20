function doesImmediatelyReturnFunctionExpression({ body, }) {
        // Should always have a body; really checking just in case
        /* istanbul ignore if */ if (!body) {
            return false;
        }
        // Check if body is a block with a single statement
        if (body.type === utils_1.AST_NODE_TYPES.BlockStatement && body.body.length === 1) {
            const [statement] = body.body;
            // Check if that statement is a return statement with an argument
            if (statement.type === utils_1.AST_NODE_TYPES.ReturnStatement &&
                !!statement.argument) {
                // If so, check that returned argument as body
                body = statement.argument;
            }
        }
        // Check if the body being returned is a function expression
        return (body.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression ||
            body.type === utils_1.AST_NODE_TYPES.FunctionExpression);
    }