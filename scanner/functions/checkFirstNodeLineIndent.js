function checkFirstNodeLineIndent(node, firstLineIndent) {
                const startIndent = getNodeIndent(node, false);
                if ((startIndent.goodChar !== firstLineIndent || startIndent.badChar !== 0) && isNodeFirstInLine(node)) {
                    report(node, firstLineIndent, startIndent.space, startIndent.tab, { line: node.loc.start.line, column: node.loc.start.column });
                }
            }