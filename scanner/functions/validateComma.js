function validateComma(node, property) {
                const items = node[property], arrayLiteral = (node.type === "ArrayExpression" || node.type === "ArrayPattern");
                if (items.length > 1 || arrayLiteral) {
                    // seed as opening [
                    let previousItemToken = sourceCode.getFirstToken(node);
                    items.forEach(item => {
                        const commaToken = item ? sourceCode.getTokenBefore(item) : previousItemToken, currentItemToken = item ? sourceCode.getFirstToken(item) : sourceCode.getTokenAfter(commaToken), reportItem = item || currentItemToken;
                        /*
                         * This works by comparing three token locations:
                         * - previousItemToken is the last token of the previous item
                         * - commaToken is the location of the comma before the current item
                         * - currentItemToken is the first token of the current item
                         *
                         * These values get switched around if item is undefined.
                         * previousItemToken will refer to the last token not belonging
                         * to the current item, which could be a comma or an opening
                         * square bracket. currentItemToken could be a comma.
                         *
                         * All comparisons are done based on these tokens directly, so
                         * they are always valid regardless of an undefined item.
                         */
                        if (astUtils.isCommaToken(commaToken)) {
                            validateCommaItemSpacing(previousItemToken, commaToken, currentItemToken, reportItem);
                        }
                        if (item) {
                            const tokenAfterItem = sourceCode.getTokenAfter(item, astUtils.isNotClosingParenToken);
                            previousItemToken = tokenAfterItem
                                ? sourceCode.getTokenBefore(tokenAfterItem)
                                : sourceCode.ast.tokens[sourceCode.ast.tokens.length - 1];
                        }
                        else {
                            previousItemToken = currentItemToken;
                        }
                    });
                    /*
                     * Special case for array literals that have empty last items, such
                     * as [ 1, 2, ]. These arrays only have two items show up in the
                     * AST, so we need to look at the token to verify that there's no
                     * dangling comma.
                     */
                    if (arrayLiteral) {
                        const lastToken = sourceCode.getLastToken(node), nextToLastToken = sourceCode.getTokenBefore(lastToken);
                        if (astUtils.isCommaToken(nextToLastToken)) {
                            validateCommaItemSpacing(sourceCode.getTokenBefore(nextToLastToken), nextToLastToken, lastToken, lastToken);
                        }
                    }
                }
            }