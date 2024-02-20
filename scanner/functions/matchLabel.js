function matchLabel(current, label) {
        const result = {
            statements: [],
            end: current.end,
        };
        const labelText = label.text;
        for (const statement of current.statements) {
            switch (statement.kind) {
                case ts.SyntaxKind.BreakStatement:
                case ts.SyntaxKind.ContinueStatement:
                    if (statement.label !== undefined && statement.label.text === labelText) {
                        result.end = false;
                        continue;
                    }
            }
            result.statements.push(statement);
        }
        return result;
    }