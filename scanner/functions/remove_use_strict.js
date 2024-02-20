function remove_use_strict() {
        return (context) => (root) => {
            const { factory } = context;
            const statements = root.statements.filter((node) => {
                if (typescript_1.default.isExpressionStatement(node)) {
                    const expr = node.expression;
                    if (typescript_1.default.isStringLiteral(expr) && expr.text == "use strict")
                        return false;
                }
                return true;
            });
            return factory.updateSourceFile(root, statements);
        };
    }