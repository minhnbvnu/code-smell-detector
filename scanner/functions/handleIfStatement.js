function handleIfStatement(node, checker) {
        switch (getConstantCondition(node.expression)) {
            case true:
                // else branch is never executed
                return getControlFlowEndWorker(node.thenStatement, checker);
            case false:
                // then branch is never executed
                return node.elseStatement === undefined
                    ? defaultControlFlowEnd
                    : getControlFlowEndWorker(node.elseStatement, checker);
        }
        const then = getControlFlowEndWorker(node.thenStatement, checker);
        if (node.elseStatement === undefined)
            return {
                statements: then.statements,
                end: false,
            };
        const elze = getControlFlowEndWorker(node.elseStatement, checker);
        return {
            statements: [...then.statements, ...elze.statements],
            end: then.end && elze.end,
        };
    }