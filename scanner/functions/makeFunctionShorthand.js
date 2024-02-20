function makeFunctionShorthand(fixer, node) {
                const firstKeyToken = node.computed
                    ? sourceCode.getFirstToken(node, astUtils.isOpeningBracketToken)
                    : sourceCode.getFirstToken(node.key);
                const lastKeyToken = node.computed
                    ? sourceCode.getFirstTokenBetween(node.key, node.value, astUtils.isClosingBracketToken)
                    : sourceCode.getLastToken(node.key);
                const keyText = sourceCode.text.slice(firstKeyToken.range[0], lastKeyToken.range[1]);
                let keyPrefix = "";
                // key: /* */ () => {}
                if (sourceCode.commentsExistBetween(lastKeyToken, node.value)) {
                    return null;
                }
                if (node.value.async) {
                    keyPrefix += "async ";
                }
                if (node.value.generator) {
                    keyPrefix += "*";
                }
                const fixRange = [firstKeyToken.range[0], node.range[1]];
                const methodPrefix = keyPrefix + keyText;
                if (node.value.type === "FunctionExpression") {
                    const functionToken = sourceCode.getTokens(node.value).find(token => token.type === "Keyword" && token.value === "function");
                    const tokenBeforeParams = node.value.generator ? sourceCode.getTokenAfter(functionToken) : functionToken;
                    return fixer.replaceTextRange(fixRange, methodPrefix + sourceCode.text.slice(tokenBeforeParams.range[1], node.value.range[1]));
                }
                const arrowToken = sourceCode.getTokenBefore(node.value.body, astUtils.isArrowToken);
                const fnBody = sourceCode.text.slice(arrowToken.range[1], node.value.range[1]);
                let shouldAddParensAroundParameters = false;
                let tokenBeforeParams;
                if (node.value.params.length === 0) {
                    tokenBeforeParams = sourceCode.getFirstToken(node.value, astUtils.isOpeningParenToken);
                }
                else {
                    tokenBeforeParams = sourceCode.getTokenBefore(node.value.params[0]);
                }
                if (node.value.params.length === 1) {
                    const hasParen = astUtils.isOpeningParenToken(tokenBeforeParams);
                    const isTokenOutsideNode = tokenBeforeParams.range[0] < node.range[0];
                    shouldAddParensAroundParameters = !hasParen || isTokenOutsideNode;
                }
                const sliceStart = shouldAddParensAroundParameters
                    ? node.value.params[0].range[0]
                    : tokenBeforeParams.range[0];
                const sliceEnd = sourceCode.getTokenBefore(arrowToken).range[1];
                const oldParamText = sourceCode.text.slice(sliceStart, sliceEnd);
                const newParamText = shouldAddParensAroundParameters ? `(${oldParamText})` : oldParamText;
                return fixer.replaceTextRange(fixRange, methodPrefix + newParamText + fnBody);
            }