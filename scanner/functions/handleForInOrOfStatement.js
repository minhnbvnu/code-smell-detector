function handleForInOrOfStatement(statement, checker) {
        const end = matchBreakOrContinue(getControlFlowEndWorker(statement.statement, checker), node_1.isBreakOrContinueStatement);
        end.end = false; // loop body is guaranteed to be executed
        return end;
    }