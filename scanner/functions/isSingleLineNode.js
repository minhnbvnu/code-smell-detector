function isSingleLineNode(node) {
                const lastToken = sourceCode.getLastToken(node), startLine = node.loc.start.line, endLine = lastToken.loc.end.line;
                return startLine === endLine;
            }