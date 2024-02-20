function handleBlock(statement, checker) {
        const result = { statements: [], end: false };
        for (const s of statement.statements) {
            const current = getControlFlowEndWorker(s, checker);
            result.statements.push(...current.statements);
            if (current.end) {
                result.end = true;
                break;
            }
        }
        return result;
    }