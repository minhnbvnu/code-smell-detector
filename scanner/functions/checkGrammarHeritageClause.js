function checkGrammarHeritageClause(node) {
                const types = node.types;
                if (checkGrammarForDisallowedTrailingComma(types)) {
                    return true;
                }
                if (types && types.length === 0) {
                    const listType = tokenToString(node.token);
                    return grammarErrorAtPos(node, types.pos, 0, Diagnostics._0_list_cannot_be_empty, listType);
                }
                return some(types, checkGrammarExpressionWithTypeArguments);
            }