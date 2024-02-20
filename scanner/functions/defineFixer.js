function defineFixer(node, sourceCode) {
        return function* (fixer) {
            const leftParen = sourceCode.getTokenAfter(node.callee, isOpeningParenToken);
            const rightParen = sourceCode.getLastToken(node);
            // Remove everything before the opening paren: callee `Object.assign`, type arguments, and whitespace between the callee and the paren.
            yield fixer.removeRange([node.range[0], leftParen.range[0]]);
            // Replace the parens of argument list to braces.
            if (needsParens(node, sourceCode)) {
                yield fixer.replaceText(leftParen, "({");
                yield fixer.replaceText(rightParen, "})");
            }
            else {
                yield fixer.replaceText(leftParen, "{");
                yield fixer.replaceText(rightParen, "}");
            }
            // Process arguments.
            for (const argNode of node.arguments) {
                const innerParens = getParenTokens(argNode, leftParen, sourceCode);
                const left = innerParens.shift();
                const right = innerParens.pop();
                if (argNode.type === "ObjectExpression") {
                    const maybeTrailingComma = sourceCode.getLastToken(argNode, 1);
                    const maybeArgumentComma = sourceCode.getTokenAfter(right);
                    /*
                     * Make bare this object literal.
                     * And remove spaces inside of the braces for better formatting.
                     */
                    for (const innerParen of innerParens) {
                        yield fixer.remove(innerParen);
                    }
                    const leftRange = [left.range[0], getEndWithSpaces(left, sourceCode)];
                    const rightRange = [
                        Math.max(getStartWithSpaces(right, sourceCode), leftRange[1]),
                        right.range[1]
                    ];
                    yield fixer.removeRange(leftRange);
                    yield fixer.removeRange(rightRange);
                    // Remove the comma of this argument if it's duplication.
                    if ((argNode.properties.length === 0 || isCommaToken(maybeTrailingComma)) &&
                        isCommaToken(maybeArgumentComma)) {
                        yield fixer.remove(maybeArgumentComma);
                    }
                }
                else {
                    // Make spread.
                    if (argNeedsParens(argNode, sourceCode)) {
                        yield fixer.insertTextBefore(left, "...(");
                        yield fixer.insertTextAfter(right, ")");
                    }
                    else {
                        yield fixer.insertTextBefore(left, "...");
                    }
                }
            }
        };
    }