function isNodeFirstInLine(node, byEndLocation) {
                const firstToken = byEndLocation === true ? sourceCode.getLastToken(node, 1) : sourceCode.getTokenBefore(node), startLine = byEndLocation === true ? node.loc.end.line : node.loc.start.line, endLine = firstToken ? firstToken.loc.end.line : -1;
                return startLine !== endLine;
            }