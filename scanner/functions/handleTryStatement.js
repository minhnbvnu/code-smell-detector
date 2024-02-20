function handleTryStatement(node, checker) {
        let finallyResult;
        if (node.finallyBlock !== undefined) {
            finallyResult = handleBlock(node.finallyBlock, checker);
            // if 'finally' always ends control flow, we are not interested in any jump statements from 'try' or 'catch'
            if (finallyResult.end)
                return finallyResult;
        }
        const tryResult = handleBlock(node.tryBlock, checker);
        if (node.catchClause === undefined)
            return { statements: finallyResult.statements.concat(tryResult.statements), end: tryResult.end };
        const catchResult = handleBlock(node.catchClause.block, checker);
        return {
            statements: tryResult.statements
                // remove all throw statements and throwing function calls from the list of control flow statements inside tryBlock
                .filter((s) => s.kind !== ts.SyntaxKind.ThrowStatement && s.kind !== ts.SyntaxKind.ExpressionStatement)
                .concat(catchResult.statements, finallyResult === undefined ? [] : finallyResult.statements),
            end: tryResult.end && catchResult.end, // only ends control flow if try AND catch definitely end control flow
        };
    }