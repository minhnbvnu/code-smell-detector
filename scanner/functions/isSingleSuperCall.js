function isSingleSuperCall(body) {
        return (body.length === 1 &&
            body[0].type === "ExpressionStatement" &&
            body[0].expression.type === "CallExpression" &&
            body[0].expression.callee.type === "Super");
    }