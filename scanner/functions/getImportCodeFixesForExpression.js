function getImportCodeFixesForExpression(context, expr) {
            const type = context.program.getTypeChecker().getTypeAtLocation(expr);
            if (!(type.symbol && isTransientSymbol(type.symbol) && type.symbol.links.originatingImport)) {
                return [];
            }
            const fixes = [];
            const relatedImport = type.symbol.links.originatingImport;
            if (!isImportCall(relatedImport)) {
                addRange(fixes, getCodeFixesForImportDeclaration(context, relatedImport));
            }
            if (isExpression(expr) && !(isNamedDeclaration(expr.parent) && expr.parent.name === expr)) {
                const sourceFile = context.sourceFile;
                const changes = ts_textChanges_exports.ChangeTracker.with(context, (t) => t.replaceNode(sourceFile, expr, factory.createPropertyAccessExpression(expr, "default"), {}));
                fixes.push(createCodeFixActionWithoutFixAll(fixName5, changes, Diagnostics.Use_synthetic_default_member));
            }
            return fixes;
        }