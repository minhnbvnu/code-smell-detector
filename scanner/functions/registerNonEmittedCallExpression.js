function registerNonEmittedCallExpression(emitted) {
        const { node } = emitted;

        if (!emitted.exit && sourceCode.getParent(node).type !== "EmitStatement") {
            callExpressions.push(node);
        }
    }