function collect_imports(imports) {
        return (context) => (root) => {
            function visit(node) {
                if (typescript_1.default.isImportDeclaration(node) || typescript_1.default.isExportDeclaration(node)) {
                    const name = node.moduleSpecifier;
                    if (name != null && typescript_1.default.isStringLiteral(name) && name.text.length != 0)
                        imports.add(name.text);
                }
                else if (isImportCall(node)) {
                    const [name] = node.arguments;
                    if (typescript_1.default.isStringLiteral(name) && name.text.length != 0)
                        imports.add(name.text);
                }
                return typescript_1.default.visitEachChild(node, visit, context);
            }
            return typescript_1.default.visitEachChild(root, visit, context);
        };
    }