function testCodeAroundComment(node) {
                const startLine = String(sourceCode.lines[node.loc.start.line - 1]), endLine = String(sourceCode.lines[node.loc.end.line - 1]), preamble = startLine.slice(0, node.loc.start.column).trim(), postamble = endLine.slice(node.loc.end.column).trim(), isPreambleEmpty = !preamble, isPostambleEmpty = !postamble;
                // Nothing on both sides
                if (isPreambleEmpty && isPostambleEmpty) {
                    return;
                }
                // Matches the ignore pattern
                if (customIgnoreRegExp && customIgnoreRegExp.test(node.value)) {
                    return;
                }
                // JSX Exception
                if ((isPreambleEmpty || preamble === "{") &&
                    (isPostambleEmpty || postamble === "}")) {
                    const enclosingNode = sourceCode.getNodeByRangeIndex(node.range[0]);
                    if (enclosingNode && enclosingNode.type === "JSXEmptyExpression") {
                        return;
                    }
                }
                // Don't report ESLint directive comments
                if (astUtils.isDirectiveComment(node)) {
                    return;
                }
                context.report({
                    node,
                    messageId: "unexpectedInlineComment"
                });
            }