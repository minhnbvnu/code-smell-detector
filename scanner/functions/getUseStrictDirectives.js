function getUseStrictDirectives(statements) {
        const directives = [];
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (statement.type === "ExpressionStatement" &&
                statement.expression.type === "Literal" &&
                statement.expression.value === "use strict") {
                directives[i] = statement;
            }
            else {
                break;
            }
        }
        return directives;
    }