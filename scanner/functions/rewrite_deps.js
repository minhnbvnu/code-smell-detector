function rewrite_deps(resolve) {
        return (context) => (root) => {
            const { factory } = context;
            function visit(node) {
                if (is_require(node)) {
                    const [arg] = node.arguments;
                    if (typescript_1.default.isStringLiteral(arg) && arg.text.length > 0) {
                        const dep = arg.text;
                        const val = resolve(dep);
                        if (val != null) {
                            const literal = typeof val == "string" ? factory.createStringLiteral(val) : factory.createNumericLiteral(val);
                            node = factory.updateCallExpression(node, node.expression, node.typeArguments, [literal]);
                            typescript_1.default.addSyntheticTrailingComment(node, typescript_1.default.SyntaxKind.MultiLineCommentTrivia, ` ${dep} `, false);
                        }
                        return node;
                    }
                }
                return typescript_1.default.visitEachChild(node, visit, context);
            }
            return typescript_1.default.visitEachChild(root, visit, context);
        };
    }