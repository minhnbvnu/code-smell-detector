function getFixableErrorSpanDeclaration(sourceFile, span) {
            if (!span)
                return void 0;
            const token = getTokenAtPosition(sourceFile, span.start);
            const decl = findAncestor(token, (node) => {
                if (node.getStart(sourceFile) < span.start || node.getEnd() > textSpanEnd(span)) {
                    return "quit";
                }
                return (isArrowFunction(node) || isMethodDeclaration(node) || isFunctionExpression(node) || isFunctionDeclaration(node)) && textSpansEqual(span, createTextSpanFromNode(node, sourceFile));
            });
            return decl;
        }