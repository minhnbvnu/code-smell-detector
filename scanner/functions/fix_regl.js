function fix_regl() {
        return (context) => (root) => {
            if (!root.fileName.endsWith("regl.js")) {
                return root;
            }
            const { factory } = context;
            function visit(node) {
                if (typescript_1.default.isFunctionDeclaration(node) && node.name != null && typescript_1.default.isIdentifier(node.name)) {
                    if (node.name.text == "guessCommand" || node.name.text == "guessCallSite") {
                        const value = factory.createStringLiteral("unknown");
                        const body = factory.createBlock([factory.createReturnStatement(value)]);
                        return factory.createFunctionDeclaration(undefined, undefined, node.name, undefined, [], undefined, body);
                    }
                }
                return typescript_1.default.visitEachChild(node, visit, context);
            }
            return typescript_1.default.visitEachChild(root, visit, context);
        };
    }