function rename_exports() {
        return (context) => (root) => {
            const { factory } = context;
            function is_exports(node) {
                return typescript_1.default.isIdentifier(node) && node.text == "exports";
            }
            const has_exports = root.statements.some((stmt) => {
                return typescript_1.default.isVariableStatement(stmt) && stmt.declarationList.declarations.some((decl) => is_exports(decl.name));
            });
            if (has_exports) {
                function visit(node) {
                    if (is_exports(node)) {
                        const updated = factory.createIdentifier("exports$1");
                        const original = node;
                        typescript_1.default.setOriginalNode(updated, original);
                        typescript_1.default.setTextRange(updated, original);
                        return updated;
                    }
                    return typescript_1.default.visitEachChild(node, visit, context);
                }
                return typescript_1.default.visitEachChild(root, visit, context);
            }
            else
                return root;
        };
    }