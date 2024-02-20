function formatNodeLines(node, sourceFile, formatContext, requestKind) {
            if (!node) {
                return [];
            }
            const span = {
                pos: getLineStartPositionForPosition(node.getStart(sourceFile), sourceFile),
                end: node.end
            };
            return formatSpan(span, sourceFile, formatContext, requestKind);
        }