function checkNodeIndent(node, neededIndent) {
                const actualIndent = getNodeIndent(node, false);
                if (node.type !== "ArrayExpression" &&
                    node.type !== "ObjectExpression" &&
                    (actualIndent.goodChar !== neededIndent || actualIndent.badChar !== 0) &&
                    isNodeFirstInLine(node)) {
                    report(node, neededIndent, actualIndent.space, actualIndent.tab);
                }
                if (node.type === "IfStatement" && node.alternate) {
                    const elseToken = sourceCode.getTokenBefore(node.alternate);
                    checkNodeIndent(elseToken, neededIndent);
                    if (!isNodeFirstInLine(node.alternate)) {
                        checkNodeIndent(node.alternate, neededIndent);
                    }
                }
                if (node.type === "TryStatement" && node.handler) {
                    const catchToken = sourceCode.getFirstToken(node.handler);
                    checkNodeIndent(catchToken, neededIndent);
                }
                if (node.type === "TryStatement" && node.finalizer) {
                    const finallyToken = sourceCode.getTokenBefore(node.finalizer);
                    checkNodeIndent(finallyToken, neededIndent);
                }
                if (node.type === "DoWhileStatement") {
                    const whileToken = sourceCode.getTokenAfter(node.body);
                    checkNodeIndent(whileToken, neededIndent);
                }
            }