function checkLastNodeLineIndent(node, lastLineIndent) {
                const lastToken = sourceCode.getLastToken(node);
                const endIndent = getNodeIndent(lastToken, true);
                if ((endIndent.goodChar !== lastLineIndent || endIndent.badChar !== 0) && isNodeFirstInLine(node, true)) {
                    report(node, lastLineIndent, endIndent.space, endIndent.tab, { line: lastToken.loc.start.line, column: lastToken.loc.start.column }, true);
                }
            }