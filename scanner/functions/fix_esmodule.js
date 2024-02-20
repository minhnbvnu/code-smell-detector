function fix_esmodule() {
        return (context) => (root) => {
            const { factory } = context;
            let found = false;
            const statements = root.statements.map((node) => {
                if (!found && typescript_1.default.isExpressionStatement(node)) {
                    const expr = node.expression;
                    if (typescript_1.default.isCallExpression(expr) && expr.arguments.length == 3) {
                        const [, arg] = expr.arguments;
                        if (typescript_1.default.isStringLiteral(arg) && arg.text == "__esModule") {
                            found = true;
                            const es_module = factory.createIdentifier("__esModule");
                            const call = factory.createCallExpression(es_module, [], []);
                            return factory.createExpressionStatement(call);
                        }
                    }
                }
                return node;
            });
            return factory.updateSourceFile(root, statements);
        };
    }