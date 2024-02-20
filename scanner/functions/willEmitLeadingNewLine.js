function willEmitLeadingNewLine(node) {
                if (!currentSourceFile)
                    return false;
                if (some(getLeadingCommentRanges(currentSourceFile.text, node.pos), commentWillEmitNewLine))
                    return true;
                if (some(getSyntheticLeadingComments(node), commentWillEmitNewLine))
                    return true;
                if (isPartiallyEmittedExpression(node)) {
                    if (node.pos !== node.expression.pos) {
                        if (some(getTrailingCommentRanges(currentSourceFile.text, node.expression.pos), commentWillEmitNewLine))
                            return true;
                    }
                    return willEmitLeadingNewLine(node.expression);
                }
                return false;
            }