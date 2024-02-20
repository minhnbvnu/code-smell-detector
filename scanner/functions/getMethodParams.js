function getMethodParams(node) {
                let params = '()';
                if (node.params.length > 0) {
                    const openingParen = util.nullThrows(sourceCode.getTokenBefore(node.params[0], util.isOpeningParenToken), 'Missing opening paren before first parameter');
                    const closingParen = util.nullThrows(sourceCode.getTokenAfter(node.params[node.params.length - 1], util.isClosingParenToken), 'Missing closing paren after last parameter');
                    params = sourceCode.text.substring(openingParen.range[0], closingParen.range[1]);
                }
                if (node.typeParameters != null) {
                    const typeParams = sourceCode.getText(node.typeParameters);
                    params = `${typeParams}${params}`;
                }
                return params;
            }