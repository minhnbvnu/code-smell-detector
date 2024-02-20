function getWrappingFixer(params) {
        const { sourceCode, node, innerNode = node, wrap } = params;
        const innerNodes = Array.isArray(innerNode) ? innerNode : [innerNode];
        return (fixer) => {
            const innerCodes = innerNodes.map(innerNode => {
                let code = sourceCode.getText(innerNode);
                // check the inner expression's precedence
                if (!isStrongPrecedenceNode(innerNode)) {
                    // the code we are adding might have stronger precedence than our wrapped node
                    // let's wrap our node in parens in case it has a weaker precedence than the code we are wrapping it in
                    code = `(${code})`;
                }
                return code;
            });
            // do the wrapping
            let code = wrap(...innerCodes);
            // check the outer expression's precedence
            if (isWeakPrecedenceParent(node)) {
                // we wrapped the node in some expression which very likely has a different precedence than original wrapped node
                // let's wrap the whole expression in parens just in case
                if (!utils_1.ASTUtils.isParenthesized(node, sourceCode)) {
                    code = `(${code})`;
                }
            }
            // check if we need to insert semicolon
            if (/^[`([]/.exec(code) && isMissingSemicolonBefore(node, sourceCode)) {
                code = `;${code}`;
            }
            return fixer.replaceText(node, code);
        };
    }