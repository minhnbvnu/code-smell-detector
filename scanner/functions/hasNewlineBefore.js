function hasNewlineBefore(node) {
                const lineNumNode = node.loc.start.line;
                const lineNumTokenBefore = getLineNumberOfTokenBefore(node);
                const commentLines = calcCommentLines(node, lineNumTokenBefore);
                return (lineNumNode - lineNumTokenBefore - commentLines) > 1;
            }