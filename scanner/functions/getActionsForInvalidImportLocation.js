function getActionsForInvalidImportLocation(context) {
            const sourceFile = context.sourceFile;
            const node = findAncestor(getTokenAtPosition(sourceFile, context.span.start), (a) => a.getStart() === context.span.start && a.getEnd() === context.span.start + context.span.length);
            if (!node) {
                return [];
            }
            return getImportCodeFixesForExpression(context, node);
        }