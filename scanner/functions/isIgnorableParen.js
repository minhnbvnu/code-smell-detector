function isIgnorableParen(node) {
                return isParenthesizedExpression(node) && nodeIsSynthesized(node) && nodeIsSynthesized(getSourceMapRange(node)) && nodeIsSynthesized(getCommentRange(node)) && !some(getSyntheticLeadingComments(node)) && !some(getSyntheticTrailingComments(node));
            }