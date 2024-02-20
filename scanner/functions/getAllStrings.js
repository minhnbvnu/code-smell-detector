function getAllStrings() {
                return sourceCode.ast.tokens.filter(token => (token.type === "String" ||
                    (token.type === "JSXText" && sourceCode.getNodeByRangeIndex(token.range[0] - 1).type === "JSXAttribute")));
            }