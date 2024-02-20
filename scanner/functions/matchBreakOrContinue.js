function matchBreakOrContinue(current, pred) {
        const result = {
            statements: [],
            end: current.end,
        };
        for (const statement of current.statements) {
            if (pred(statement) && statement.label === undefined) {
                result.end = false;
                continue;
            }
            result.statements.push(statement);
        }
        return result;
    }