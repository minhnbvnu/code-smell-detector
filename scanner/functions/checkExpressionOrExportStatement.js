function checkExpressionOrExportStatement(node) {
                const firstToken = isParenthesised(node) ? sourceCode.getTokenBefore(node) : sourceCode.getFirstToken(node);
                const secondToken = sourceCode.getTokenAfter(firstToken, astUtils.isNotOpeningParenToken);
                const thirdToken = secondToken ? sourceCode.getTokenAfter(secondToken) : null;
                const tokenAfterClosingParens = secondToken ? sourceCode.getTokenAfter(secondToken, astUtils.isNotClosingParenToken) : null;
                if (astUtils.isOpeningParenToken(firstToken) &&
                    (astUtils.isOpeningBraceToken(secondToken) ||
                        secondToken.type === "Keyword" && (secondToken.value === "function" ||
                            secondToken.value === "class" ||
                            secondToken.value === "let" &&
                                tokenAfterClosingParens &&
                                (astUtils.isOpeningBracketToken(tokenAfterClosingParens) ||
                                    tokenAfterClosingParens.type === "Identifier")) ||
                        secondToken && secondToken.type === "Identifier" && secondToken.value === "async" && thirdToken && thirdToken.type === "Keyword" && thirdToken.value === "function")) {
                    tokensToIgnore.add(secondToken);
                }
                const hasExtraParens = node.parent.type === "ExportDefaultDeclaration"
                    ? hasExcessParensWithPrecedence(node, PRECEDENCE_OF_ASSIGNMENT_EXPR)
                    : hasExcessParens(node);
                if (hasExtraParens) {
                    report(node);
                }
            }