function fix_esexports() {
        return (context) => (root) => {
            const { factory } = context;
            const statements = root.statements.map((node) => {
                if (typescript_1.default.isExpressionStatement(node)) {
                    const expr = node.expression;
                    if (typescript_1.default.isCallExpression(expr) && typescript_1.default.isPropertyAccessExpression(expr.expression) && expr.arguments.length == 3) {
                        const { expression, name } = expr.expression;
                        if (typescript_1.default.isIdentifier(expression) && expression.text == "Object" &&
                            typescript_1.default.isIdentifier(name) && name.text == "defineProperty") {
                            const [exports, name, config] = expr.arguments;
                            if (typescript_1.default.isIdentifier(exports) && exports.text == "exports" &&
                                typescript_1.default.isStringLiteral(name) &&
                                typescript_1.default.isObjectLiteralExpression(config)) {
                                for (const item of config.properties) {
                                    if (typescript_1.default.isPropertyAssignment(item) &&
                                        typescript_1.default.isIdentifier(item.name) && item.name.text == "get" &&
                                        typescript_1.default.isFunctionExpression(item.initializer)) {
                                        const { statements } = item.initializer.body;
                                        if (statements.length == 1) {
                                            const [stmt] = statements;
                                            if (typescript_1.default.isReturnStatement(stmt) && stmt.expression != null) {
                                                const es_export = factory.createIdentifier("__esExport");
                                                const call = factory.createCallExpression(es_export, [], [name, stmt.expression]);
                                                return factory.createExpressionStatement(call);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return node;
            });
            return factory.updateSourceFile(root, statements);
        };
    }