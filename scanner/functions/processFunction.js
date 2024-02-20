function processFunction(funcNode) {
                const node = isEmbedded(funcNode) ? funcNode.parent : funcNode;
                if (!IIFEs && isIIFE(node)) {
                    return;
                }
                let lineCount = 0;
                for (let i = node.loc.start.line - 1; i < node.loc.end.line; ++i) {
                    const line = lines[i];
                    if (skipComments) {
                        if (commentLineNumbers.has(i + 1) && isFullLineComment(line, i + 1, commentLineNumbers.get(i + 1))) {
                            continue;
                        }
                    }
                    if (skipBlankLines) {
                        if (line.match(/^\s*$/u)) {
                            continue;
                        }
                    }
                    lineCount++;
                }
                if (lineCount > maxLines) {
                    const name = upperCaseFirst(astUtils.getFunctionNameWithKind(funcNode));
                    context.report({
                        node,
                        messageId: "exceed",
                        data: { name, lineCount, maxLines }
                    });
                }
            }