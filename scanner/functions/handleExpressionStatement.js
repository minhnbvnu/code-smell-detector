function handleExpressionStatement(node, checker) {
        if (!node_1.isCallExpression(node.expression))
            return defaultControlFlowEnd;
        switch (callExpressionAffectsControlFlow(node.expression, checker)) {
            case 2 /* Asserts */:
                return { statements: [node], end: false };
            case 1 /* Never */:
                return { statements: [node], end: true };
            case undefined:
                return defaultControlFlowEnd;
        }
    }