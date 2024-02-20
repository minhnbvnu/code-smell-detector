function hasExcessParensNoLineTerminator(token, node) {
                if (token.loc.end.line === node.loc.start.line) {
                    return hasExcessParens(node);
                }
                return hasDoubleExcessParens(node);
            }