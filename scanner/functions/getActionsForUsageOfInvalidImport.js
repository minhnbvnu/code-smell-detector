function getActionsForUsageOfInvalidImport(context) {
            const sourceFile = context.sourceFile;
            const targetKind = Diagnostics.This_expression_is_not_callable.code === context.errorCode ? 210 /* CallExpression */ : 211 /* NewExpression */;
            const node = findAncestor(getTokenAtPosition(sourceFile, context.span.start), (a) => a.kind === targetKind);
            if (!node) {
                return [];
            }
            const expr = node.expression;
            return getImportCodeFixesForExpression(context, expr);
        }