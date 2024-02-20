function getFixableErrorSpanExpression(sourceFile, span) {
            const token = getTokenAtPosition(sourceFile, span.start);
            const expression = findAncestor(token, (node) => {
                if (node.getStart(sourceFile) < span.start || node.getEnd() > textSpanEnd(span)) {
                    return "quit";
                }
                return isExpression(node) && textSpansEqual(span, createTextSpanFromNode(node, sourceFile));
            });
            return expression;
        }