function remove_void0() {
        return (context) => (root) => {
            const { factory } = context;
            let found = false;
            const statements = root.statements.filter((node) => {
                if (!found && typescript_1.default.isExpressionStatement(node)) {
                    let { expression } = node;
                    while (typescript_1.default.isBinaryExpression(expression) &&
                        typescript_1.default.isPropertyAccessExpression(expression.left) &&
                        typescript_1.default.isIdentifier(expression.left.expression) &&
                        expression.left.expression.text == "exports") {
                        expression = expression.right;
                    }
                    if (typescript_1.default.isVoidExpression(expression)) {
                        found = true;
                        return false;
                    }
                }
                return true;
            });
            return factory.updateSourceFile(root, statements);
        };
    }