function checkForSpaces(node) {
                const tokens = node.type === "UpdateExpression" && !node.prefix
                    ? sourceCode.getLastTokens(node, 2)
                    : sourceCode.getFirstTokens(node, 2);
                const firstToken = tokens[0];
                const secondToken = tokens[1];
                if ((node.type === "NewExpression" || node.prefix) && firstToken.type === "Keyword") {
                    checkUnaryWordOperatorForSpaces(node, firstToken, secondToken, firstToken.value);
                    return;
                }
                const operator = node.prefix ? tokens[0].value : tokens[1].value;
                if (overrideExistsForOperator(operator)) {
                    if (overrideEnforcesSpaces(operator)) {
                        verifyNonWordsHaveSpaces(node, firstToken, secondToken);
                    }
                    else {
                        verifyNonWordsDontHaveSpaces(node, firstToken, secondToken);
                    }
                }
                else if (options.nonwords) {
                    verifyNonWordsHaveSpaces(node, firstToken, secondToken);
                }
                else {
                    verifyNonWordsDontHaveSpaces(node, firstToken, secondToken);
                }
            }