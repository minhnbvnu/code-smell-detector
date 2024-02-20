function relativize_modules(relativize) {
        function relativize_specifier(context, source, expr) {
            const { factory } = context;
            if (expr != null && typescript_1.default.isStringLiteralLike(expr) && expr.text.length > 0) {
                const relative = relativize(source.fileName, expr.text);
                if (relative != null)
                    return factory.createStringLiteral(relative);
            }
            return null;
        }
        return (context) => {
            return {
                transformSourceFile(root) {
                    const { factory } = context;
                    function visit(node) {
                        if (typescript_1.default.isImportDeclaration(node)) {
                            const moduleSpecifier = relativize_specifier(context, root, node.moduleSpecifier);
                            if (moduleSpecifier != null) {
                                const { modifiers, importClause, assertClause } = node;
                                return factory.updateImportDeclaration(node, modifiers, importClause, moduleSpecifier, assertClause);
                            }
                        }
                        else if (typescript_1.default.isExportDeclaration(node)) {
                            const moduleSpecifier = relativize_specifier(context, root, node.moduleSpecifier);
                            if (moduleSpecifier != null) {
                                const { modifiers, isTypeOnly, exportClause, assertClause } = node;
                                return factory.updateExportDeclaration(node, modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
                            }
                        }
                        else if (is_require(node)) {
                            const moduleSpecifier = relativize_specifier(context, root, node.arguments[0]);
                            if (moduleSpecifier != null) {
                                const { expression, typeArguments } = node;
                                return factory.updateCallExpression(node, expression, typeArguments, [moduleSpecifier]);
                            }
                        }
                        else if (isImportCall(node)) {
                            const moduleSpecifier = relativize_specifier(context, root, node.arguments[0]);
                            if (moduleSpecifier != null) {
                                const { expression, typeArguments } = node;
                                return factory.updateCallExpression(node, expression, typeArguments, [moduleSpecifier]);
                            }
                        }
                        return typescript_1.default.visitEachChild(node, visit, context);
                    }
                    return typescript_1.default.visitEachChild(root, visit, context);
                },
                transformBundle(_root) {
                    throw new Error("unsupported");
                },
            };
        };
    }